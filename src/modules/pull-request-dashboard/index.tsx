/** @jsxImportSource @emotion/react */
import React from 'react';
import moment from 'moment';
import { Box } from '@mui/material';
import { UiLogo } from '@core/components/ui-logo';
import { UiPageTitle } from '@core/components/ui-page-title';
import { PrDashboardTestIds } from '@type/test-ids';
import { DatesSection } from './components/dates-section';
import { TimeService } from '@root/core/services/time-service';
import { IPullRequestsParamsMetrics } from '@core/services/api/endpoints/pull-requests-api-class';
import { FinalTabs, TabsSection } from '@modules/pull-request-dashboard/components/tabs-section';
import { boxMui, boxStyles, errorContainerStyles } from '@modules/pull-request-dashboard/styles/box';
import { AddSection } from '@modules/pull-request-dashboard/components/add-section';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { ChartSection } from '@modules/pull-request-dashboard/components/chart-section';
import { useChartSeriesBuild } from '@modules/pull-request-dashboard/hooks';
import { UiError } from '@core/components/ui-error';
import { LocalStorage } from '@root/core/services/local-storage';
import { useChartsData } from '@core/hooks/useChartsData';

import { CONFIG } from '@root/config';

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
    const [activeTab, setActiveTab] = React.useState<number>(
        LocalStorage.getItem('activeTab')
            ? JSON.parse(LocalStorage.getItem('activeTab'))
            : tabs.length
    );
    const { isLoading, data, error } = useChartsData(tabs, activeTab, dateFrom, dateTo);
    const [timeSeries, columnSeries] = useChartSeriesBuild(data);

    const dateHandler = React.useCallback((type: DatesEnum, date: moment.Moment | null) => {
        if (date) {
            const dateFormatted = moment.isMoment(date) ? TimeService.toBeSentToServer(date) : date;
            type === DatesEnum.from ? setDateFrom(dateFormatted) : setDateTo(dateFormatted);
        }
    }, [setDateFrom, setDateTo]);

    const tabsChangeHandler = React.useCallback((event: React.SyntheticEvent, value: number) => {
        LocalStorage.setItem('activeTab', value);
        setActiveTab(value);
    }, [setActiveTab]);

    const tabCloseHandler = React.useCallback((event: React.SyntheticEvent, value: number) => {
        event.stopPropagation();
        setTabs((oldTabs) => {
            setActiveTab(value);
            return oldTabs.filter((_, ind) => ind !== value );
        });
    }, [setTabs, setActiveTab]);

    const selectHandler = React.useCallback((event: SelectChangeEvent<unknown>) => {
        setMetric(event.target.value as IPullRequestsParamsMetrics);
    }, [setMetric]);

    const submitHandler = React.useCallback((event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (metric) {
            setTabs([...tabs, metric]);
        }
    }, [setTabs, tabs, metric]);

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
