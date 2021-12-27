/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box } from '@mui/material';
import { UiTabs } from '@core/components/ui-tabs';
import { IPullRequestsParamsMetrics } from '@core/services/api/endpoints/pull-requests-api-class';
import { PrDashboardTestIds } from '@type/test-ids';
import { useTabsBuild } from '@core/hooks/useTabsBuild';

interface Props {
    tabs: FinalTabs[];
    selectedValue: number;
    onChange: (event: React.SyntheticEvent, value: number) => void;
    onClose: (event: React.SyntheticEvent, value: number) => void;
}

export enum AddMetric {
    add = 'add'
}

export type FinalTabs = AddMetric | IPullRequestsParamsMetrics;

export interface TabItem {
    name: string;
    value: number;
    isClosable: boolean;
}

export const TabsSection: React.FC<Props> = React.memo((
    {
        tabs,
        selectedValue,
        onClose,
        onChange
    }) => {
    const tabsItems = useTabsBuild(tabs);
    return (
        <Box
            sx={{borderBottom: 1, borderColor: 'divider'}}
            data-testid={PrDashboardTestIds.sectionTabs}
        >
            <UiTabs
                tabs={tabsItems}
                selectedValue={selectedValue}
                onClose={onClose}
                onChange={onChange}
            />
        </Box>
    );
});
