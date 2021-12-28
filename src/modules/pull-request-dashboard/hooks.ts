import React from 'react';
import { SeriesOptionsType } from 'highcharts';
import { IPullRequestsResponse } from '@core/services/api/endpoints/pull-requests-api-class';
import { ChartType } from '@core/components/ui-chart';
import { PrDashboardServices } from '@modules/pull-request-dashboard/services';

export function useChartSeriesBuild (
    data: IPullRequestsResponse | undefined
): SeriesOptionsType[][] {

    const memoSeries = React.useMemo(() => {
        return (data?.calculated)
            ? [
                PrDashboardServices.buildCharts(data, ChartType.line),
                PrDashboardServices.buildCharts(data, ChartType.column)]
            : [[], []];
    }, [data]);

    return memoSeries;

}
