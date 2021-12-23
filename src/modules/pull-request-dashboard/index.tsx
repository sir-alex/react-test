import React from 'react';
import * as moment from 'moment-timezone';
import { UiLogo } from '@core/components/ui-logo';
import { UiPageTitle } from '@core/components/ui-page-title';
import { PrDashboardTestIds } from '@type/test-ids';
import { DatesSection } from './components/dates-section';
import { TimeService } from '@root/core/services/time-service';
import { Box } from '@mui/material';
import { IPullRequestsParamsMetrics } from '@core/services/api/endpoints/pull-requests-api-class';
import { AddMetric, FinalTabs, TabsSection } from '@modules/pull-request-dashboard/components/tabs-section';

enum DatesEnum {
    from = 'from',
    to = 'to',
}

export const PullRequestsDashboard: React.FC = React.memo(() => {
    const [dateFrom, setDateFrom] = React.useState<string | null>(null);
    const [dateTo, setDateTo] = React.useState<string | null>(null);
    const [tabs, setTabs] = React.useState<IPullRequestsParamsMetrics[]>([
        IPullRequestsParamsMetrics.prReviewCount,
        IPullRequestsParamsMetrics.prDone,
    ]);
    const [activeTab, setActiveTab] = React.useState<FinalTabs>(AddMetric.add);

    const dateHandler = (type: DatesEnum, date: moment.Moment | null): void => {
        const dateFormatted = moment.isMoment(date) ? TimeService.toBeSentToServer(date) : date;
        return type === DatesEnum.from ? setDateFrom(dateFormatted) : setDateTo(dateFormatted);
    };
    const tabsChangeHandler = (event: React.SyntheticEvent, value: FinalTabs) => {
        setActiveTab(value);
    }
    const tabCloseHandler = (event: React.SyntheticEvent, value: number) => {
        event.stopPropagation();
        debugger;
    }
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
                onChangeDateFrom={(date) => dateHandler(DatesEnum.from, date)}
                onChangeDateTo={(date) => dateHandler(DatesEnum.to, date)}
            />
            <Box>
                <TabsSection
                    tabs={tabs}
                    selectedValue={activeTab}
                    onChange={tabsChangeHandler}
                    onClose={tabCloseHandler}
                />
                {activeTab}
            </Box>
        </>
    )
})
