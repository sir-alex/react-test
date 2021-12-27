import React from 'react';
import { SeriesOptionsType } from 'highcharts';
import {
    IPullRequestsResponse,
    IPullRequestsResponseCalculatedValues
} from '@core/services/api/endpoints/pull-requests-api-class';
import { ChartType } from '@core/components/ui-chart';

export function useChartSeriesBuild (
    data: IPullRequestsResponse | undefined
): SeriesOptionsType[][] {

    const getTimeSeriesData = (values: IPullRequestsResponseCalculatedValues[]) => {
        return values.map((val) => {
            return [Date.parse(val.date), parseInt(val.values[0])];
        });
    }

    const calculateSum = (values: IPullRequestsResponseCalculatedValues[]): number => {
        const accCalculated = values.reduce((acc, val) => {
            return acc + parseInt(val.values[0]);
        }, 0);
        return accCalculated;
    }

    const memo = (type: ChartType): SeriesOptionsType[] => {
        return data!.calculated.map((repo, ind) => {
            const acc = calculateSum(repo.values);
            const average = Math.round(acc / repo.values.length)
            return {
                name: `/${repo.for.repositories[0].split('/')[2] || 'Repo ' + ind} . Avg KPI: ${average}`,
                type: type,
                data: type === ChartType.line ? getTimeSeriesData(repo.values) : [acc]
            }
        })
    }

    const memoSeries = React.useMemo(() => {
        return (data?.calculated) ? [memo(ChartType.line), memo(ChartType.column)] : [[], []];
    }, [data]);

    return memoSeries;

}
