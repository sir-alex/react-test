/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Box, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import { PrDashboardTestIds } from '@type/test-ids';
import {
    chartBoxContainerStyle,
    chartBoxStyle,
    chartTextStyle
} from '@modules/pull-request-dashboard/styles/chart';
import { FinalTabs } from '@modules/pull-request-dashboard/components/tabs-section';
import { CONFIG } from '@root/config';
import { ChartBox } from '@modules/pull-request-dashboard/components/chart-box';

interface Props {
    selectedMetric: FinalTabs;
    isLoading: boolean;
    timeSeries: Highcharts.SeriesOptionsType[];
    columnSeries: Highcharts.SeriesOptionsType[];
}

export const ChartSection: React.FC<Props> = React.memo((
    {
        selectedMetric,
        isLoading,
        timeSeries,
        columnSeries
    }) => {
    return (
        <Box
            css={chartBoxStyle}
            data-testid={PrDashboardTestIds.sectionChart}
        >
            <Typography
                css={chartTextStyle}
            >
                Selected metric: <span data-testid={PrDashboardTestIds.chartSelected}>{selectedMetric}</span>
            </Typography>
            <Box css={chartBoxContainerStyle}>
                <ChartBox
                    title={'Time series'}
                    series={timeSeries}
                    config={CONFIG.CHARTS.TIMELINES}
                    isLoading={isLoading}
                    testId={PrDashboardTestIds.chartTime}
                />
                <ChartBox
                    title={'Grouped'}
                    series={columnSeries}
                    config={CONFIG.CHARTS.COLUMNS}
                    isLoading={isLoading}
                    testId={PrDashboardTestIds.chartGroups}
                />
            </Box>
        </Box>
    );
});
