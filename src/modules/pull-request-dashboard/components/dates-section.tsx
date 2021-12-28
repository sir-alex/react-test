/** @jsxImportSource @emotion/react */
import React from 'react';
import moment from 'moment';
import { IDatePickerOnChange, UiDatePicker } from '@core/components/ui-datepicker';
import { PrDashboardTestIds } from '@type/test-ids';
import { datesStyle } from '@modules/pull-request-dashboard/styles/dates';
import { CONFIG } from '@root/config';

interface Props {
    valueDateFrom: string | null;
    valueDateTo: string | null;
    isValid: boolean;
    onChangeDateFrom: IDatePickerOnChange;
    onChangeDateTo: IDatePickerOnChange;
}

export const DatesSection: React.FC<Props> = React.memo((
    {
        valueDateFrom,
        valueDateTo,
        isValid,
        onChangeDateFrom,
        onChangeDateTo
    }
) => {
    const dayLimits = CONFIG.DATE_RANGE_LIMIT_DAYS;
    return (
        <section
            data-testid={PrDashboardTestIds.sectionDates}
            css={datesStyle}
        >
            <UiDatePicker
                title={'Date from'}
                value={valueDateFrom}
                onChange={onChangeDateFrom}
                minDate={moment(valueDateTo).subtract(dayLimits, 'days')}
                maxDate={moment(valueDateTo)}
                helperText={isValid ? '' : `Min value: DateTo minus ${dayLimits} days`}
                data-testid={PrDashboardTestIds.dateFrom}
            />
            <UiDatePicker
                title={'Date to'}
                value={valueDateTo}
                onChange={onChangeDateTo}
                maxDate={moment()}
                helperText={isValid ? '' : `Max value: today`}
                data-testid={PrDashboardTestIds.dateTo}
            />
        </section>
    )
})
