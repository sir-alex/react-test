import React from 'react';
import * as moment from 'moment-timezone';
import { UiLogo } from '@core/components/ui-logo';
import { UiPageTitle } from '@core/components/ui-page-title';
import { PrDashboardTestIds } from '@type/test-ids';
import { Dates } from './components/dates';
import { TimeService } from '@root/core/services/time-service';

enum DatesEnum {
    from = 'from',
    to = 'to',
}

export const PullRequestsDashboard: React.FC = React.memo(() => {
    const [dateFrom, setDateFrom] = React.useState<string | null>(null);
    const [dateTo, setDateTo] = React.useState<string | null>(null);
    const dateHandler = (type: DatesEnum, date: moment.Moment | null): void => {
        const dateFormatted = moment.isMoment(date) ? TimeService.toBeSentToServer(date) : date;
        return type === DatesEnum.from ? setDateFrom(dateFormatted) : setDateTo(dateFormatted);
    };
    return (
        <>
            <UiLogo/>
            <UiPageTitle
                title={'Athenian WebApp Tech Assessment'}
                data-testid={PrDashboardTestIds.title}
            />
            <Dates
                valueDateFrom={dateFrom}
                valueDateTo={dateTo}
                onChangeDateFrom={dateHandler.bind(this, DatesEnum.from)}
                onChangeDateTo={dateHandler.bind(this, DatesEnum.to)}
            />
        </>
    )
})
