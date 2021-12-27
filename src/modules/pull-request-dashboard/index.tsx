/** @jsxImportSource @emotion/react */
import React from 'react';
import moment from 'moment';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { UiLogo } from '@core/components/ui-logo';
import { UiPageTitle } from '@core/components/ui-page-title';
import { PrDashboardTestIds } from '@type/test-ids';
import { DatesSection } from './components/dates-section';
import { TimeService } from '@root/core/services/time-service';
import {
    IPullRequestsError, IPullRequestsParamsGranularities,
    IPullRequestsParamsMetrics,
    IPullRequestsResponse
} from '@core/services/api/endpoints/pull-requests-api-class';
import { FinalTabs, TabsSection } from '@modules/pull-request-dashboard/components/tabs-section';
import { boxMui, boxStyles, errorContainerStyles } from '@modules/pull-request-dashboard/styles/box';
import { AddSection } from '@modules/pull-request-dashboard/components/add-section';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { ChartSection } from '@modules/pull-request-dashboard/components/chart-section';
import { Api } from '@core/services/api/api';
import { fixedPostData } from '@modules/pull-request-dashboard/params/fixed-post-data';
import { useChartSeriesBuild } from '@core/hooks/useChartSeriesBuild';
import { PrDashboardServices } from './services';
import { CONFIG } from '@root/config';
import { UiError } from '@core/components/ui-error';
import { LocalStorage } from '@root/core/services/local-storage';

enum DatesEnum {
    from = 'from',
    to = 'to',
}

export const PullRequestsDashboard: React.FC = React.memo(() => {
    const curMoment = moment();
    const initToDate = TimeService.getToday();
    const initFromDate = TimeService.subtract(curMoment, CONFIG.DATE_RANGE_LIMIT_DAYS, 'days');
    const [dateFrom, setDateFrom] = React.useState<string>(LocalStorage.getItem('dateFrom') || initFromDate);
    const [dateTo, setDateTo] = React.useState<string>(LocalStorage.getItem('dateTo') || initToDate);
    const [metric, setMetric] = React.useState<IPullRequestsParamsMetrics | ''>('');
    const [isAddValid, setIsAddValid] = React.useState(false);
    const [tabs, setTabs] = React.useState<FinalTabs[]>(LocalStorage.getItem('tabs', true) || []);
    const [activeTab, setActiveTab] = React.useState<number>(LocalStorage.getItem('activeTab', true) || tabs.length);

    const fetchCharts = async () => {
        // @ts-ignore
        const { data } = await Api.pullRequests.postData({
            ...fixedPostData,
            metrics: [tabs[activeTab] as IPullRequestsParamsMetrics],
            date_from: dateFrom,
            date_to: dateTo,
            granularities: PrDashboardServices.getGranularity(dateFrom, dateTo)
        });
        return data;
    };

    const { isLoading, data, error } = useQuery<IPullRequestsResponse, IPullRequestsError>(
        ['charts', dateFrom, dateTo, tabs[activeTab]],
        fetchCharts,
        {
            ...CONFIG.API.FETCH_OPTIONS,
            enabled: Boolean(tabs[activeTab]) && TimeService.isDatesDiffLessThanLimit(dateFrom, dateTo, CONFIG.DATE_RANGE_LIMIT_DAYS, 'days'),
        }
    );

    const dateHandler = (type: DatesEnum, date: moment.Moment | null): void => {
        if (date) {
            const dateFormatted = moment.isMoment(date) ? TimeService.toBeSentToServer(date) : date;
            type === DatesEnum.from ? setDateFrom(dateFormatted) : setDateTo(dateFormatted);
        }
    };
    const tabsChangeHandler = (event: React.SyntheticEvent, value: number) => {
        LocalStorage.setItem('activeTab', value);
        setActiveTab(value);
    }
    const tabCloseHandler = (event: React.SyntheticEvent, value: number) => {
        event.stopPropagation();
        setTabs((oldTabs) => {
            setActiveTab(value);
            return oldTabs.filter((_, ind) => ind !== value );
        });
    }
    const selectHandler = (event: SelectChangeEvent<unknown>) => {
        setMetric(event.target.value as IPullRequestsParamsMetrics);
    }
    const submitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (metric) {
            setTabs([...tabs, metric]);
        }
    }
    const [timeSeries, columnSeries] = useChartSeriesBuild(data);

    React.useEffect(() => {
        LocalStorage.setItem('tabs', tabs);
        setMetric('');
    }, [tabs]);

    React.useEffect(() => {
        LocalStorage.setItem('dateTo', dateTo);
        LocalStorage.setItem('dateFrom', dateFrom);
        if (metric && TimeService.isDatesDiffLessThanLimit(dateFrom, dateTo, CONFIG.DATE_RANGE_LIMIT_DAYS, 'days')) {
            setIsAddValid(true);
        } else {
            setIsAddValid(false)
        }
    }, [dateTo, dateFrom, metric]);

    return (
        <>
            <UiLogo/>
            <UiPageTitle
                title={'Athenian WebApp Tech Assessment'}
                data-testid={PrDashboardTestIds.title}
            />
            <DatesSection
                valueDateFrom={dateFrom}
                valueDateTo={dateTo}
                isValid={isAddValid}
                onChangeDateFrom={(date) => dateHandler(DatesEnum.from, date)}
                onChangeDateTo={(date) => dateHandler(DatesEnum.to, date)}
            />
            <Box
                sx={boxMui}
                bgcolor="primary.main"
                css={[boxStyles, (error) ? errorContainerStyles : '']}
            >
                {error &&
                    <div css={errorContainerStyles}>
                        <UiError
                            status={error?.status}
                            text={error?.title}
                            data-testid={PrDashboardTestIds.chartError}
                        />
                    </div>
                }
                {!error &&
                    <>
                        <TabsSection
                            tabs={tabs}
                            selectedValue={activeTab}
                            onChange={tabsChangeHandler}
                            onClose={tabCloseHandler}
                        />
                        {!tabs[activeTab] &&
                            <AddSection
                                isFormValid={isAddValid}
                                selectedMetric={metric}
                                onSelect={selectHandler}
                                onSubmit={submitHandler}
                            />
                        }
                        {tabs[activeTab] &&
                            <ChartSection
                                selectedMetric={tabs[activeTab]}
                                isLoading={isLoading}
                                timeSeries={timeSeries}
                                columnSeries={columnSeries}
                            />
                        }
                    </>
                }
            </Box>
        </>
    )
})
