/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Box } from '@mui/material';
import Highcharts from 'highcharts';
import { PrDashboardTestIds } from '@type/test-ids';
import {
    chartBoxItemLoadingBgStyle,
    chartBoxItemStyle,
} from '@modules/pull-request-dashboard/styles/chart';
import { UiChart } from '@core/components/ui-chart';
import { UiLoading } from '@core/components/ui-loading';

interface Props {
    title: string;
    isLoading: boolean;
    series: Highcharts.SeriesOptionsType[];
    config: Highcharts.Options;
    testId?: string;
}

export const ChartBox: React.FC<Props> = React.memo((
    {
        title,
        isLoading,
        series,
        config,
        testId
    }) => {
    return (
        <Box css={chartBoxItemStyle}>
            {isLoading &&
                <div css={chartBoxItemLoadingBgStyle}>
                    <UiLoading data-testid={PrDashboardTestIds.chartLoading}/>
                </div>
            }
            <UiChart
                config={config}
                title={{text: title}}
                series={series}
                data-testid={testId}
            />
        </Box>
    );
});
