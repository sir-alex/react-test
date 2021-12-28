/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { PrDashboardTestIds } from '@type/test-ids';
import { UiButton } from '@core/components/ui-button';
import { UiSelect } from '@core/components/ui-select';
import { athenian } from '@core/themes/athenian';
import { IPullRequestsParamsMetrics } from '@core/services/api/endpoints/pull-requests-api-class';
import {
    addBoxStyle,
    addSelectorBoxStyle,
    addSelectStyle,
    addTextStyle
} from '@modules/pull-request-dashboard/styles/add';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { PrDashboardServices } from '../services';

interface Props {
    selectedMetric: IPullRequestsParamsMetrics | '';
    isFormValid: boolean;
    onSelect: (event: SelectChangeEvent<unknown>) => void;
    onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
}

export const AddSection: React.FC<Props> = React.memo((
    {
        selectedMetric,
        onSelect,
        isFormValid,
        onSubmit
    }) => {
    const metricChoices = PrDashboardServices.getMetricChoices();
    return (
        <Box
            css={addBoxStyle}
            data-testid={PrDashboardTestIds.sectionAdd}
        >
            <Typography
                css={addTextStyle}
                data-testid={PrDashboardTestIds.addText}
            >
                To be able to see insight select metric
            </Typography>
            <form
                onSubmit={onSubmit}
                css={addSelectorBoxStyle}
            >
                <UiSelect
                    name={'metric'}
                    label={'metric'}
                    defaultText={'Select metric'}
                    options={metricChoices}
                    value={selectedMetric}
                    onChange={onSelect}
                    data-testid={PrDashboardTestIds.addMetric}
                    css={addSelectStyle}
                />
                <UiButton
                    type={'submit'}
                    sx={{borderRadius: athenian.borderRadius / 2 + 'px'}}
                    disabled={!isFormValid}
                    title={'ADD'}
                    data-testid={PrDashboardTestIds.addBtn}
                />
            </form>
        </Box>
    );
});
