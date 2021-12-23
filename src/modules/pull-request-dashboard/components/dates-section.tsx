/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { IDatePickerOnChange, UiDatePicker } from '@core/components/ui-datepicker';
import { PrDashboardTestIds } from '@type/test-ids';
import { datesStyle } from '@modules/pull-request-dashboard/styles/dates';
import { Grid } from '@mui/material';

interface Props {
    valueDateFrom: string | null;
    valueDateTo: string | null;
    onChangeDateFrom: IDatePickerOnChange;
    onChangeDateTo: IDatePickerOnChange;
}

export const DatesSection: React.FC<Props> = React.memo((props) => {
    return (
        <section
            data-testid={PrDashboardTestIds.sectionDates}
            css={datesStyle}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <UiDatePicker
                        title={'Date from'}
                        value={props.valueDateFrom}
                        onChange={props.onChangeDateFrom}
                        data-testid={PrDashboardTestIds.dateFrom}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <UiDatePicker
                        title={'Date to'}
                        value={props.valueDateTo}
                        onChange={props.onChangeDateTo}
                        data-testid={PrDashboardTestIds.dateTo}
                    />
                </Grid>
            </Grid>
        </section>
    )
})
