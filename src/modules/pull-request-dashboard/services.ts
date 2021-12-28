import {
    IPullRequestsParamsGranularities,
    IPullRequestsParamsMetrics,
    IPullRequestsResponse,
    IPullRequestsResponseCalculatedValues,
} from '@core/services/api/endpoints/pull-requests-api-class';
import { TimeService } from '@root/core/services/time-service';
import { UiSelectOption } from '@core/components/ui-select';
import { ChartType } from '@core/components/ui-chart';
import { SeriesOptionsType } from 'highcharts';

export function getMetricChoices (): UiSelectOption[] {
    /*
    * here should be some to logic to get metric choices by the API.
    * Now values are hardcoded
    * */
    return [
        {name: IPullRequestsParamsMetrics.prWipTime, value: IPullRequestsParamsMetrics.prWipTime},
        {name: IPullRequestsParamsMetrics.prWipCount, value: IPullRequestsParamsMetrics.prWipCount},
        {name: IPullRequestsParamsMetrics.prReviewTime, value: IPullRequestsParamsMetrics.prReviewTime},
        {name: IPullRequestsParamsMetrics.prReviewCount, value: IPullRequestsParamsMetrics.prReviewCount},
        {name: IPullRequestsParamsMetrics.prMergingTime, value: IPullRequestsParamsMetrics.prMergingTime},
        {name: IPullRequestsParamsMetrics.prMergingCount, value: IPullRequestsParamsMetrics.prMergingCount},
        {name: IPullRequestsParamsMetrics.prReleaseTime, value: IPullRequestsParamsMetrics.prReleaseTime},
        {name: IPullRequestsParamsMetrics.prReleaseCount, value: IPullRequestsParamsMetrics.prReleaseCount},
        {name: IPullRequestsParamsMetrics.prLeadTime, value: IPullRequestsParamsMetrics.prLeadTime},
        {name: IPullRequestsParamsMetrics.prLeadCount, value: IPullRequestsParamsMetrics.prLeadCount},
        {name: IPullRequestsParamsMetrics.prCycleTime, value: IPullRequestsParamsMetrics.prCycleTime},
        {name: IPullRequestsParamsMetrics.prCycleCount, value: IPullRequestsParamsMetrics.prCycleCount},
        {name: IPullRequestsParamsMetrics.prOpened, value: IPullRequestsParamsMetrics.prOpened},
        {name: IPullRequestsParamsMetrics.prReviewed, value: IPullRequestsParamsMetrics.prReviewed},
        {name: IPullRequestsParamsMetrics.prNotReviewed, value: IPullRequestsParamsMetrics.prNotReviewed},
        {name: IPullRequestsParamsMetrics.prMerged, value: IPullRequestsParamsMetrics.prMerged},
        {name: IPullRequestsParamsMetrics.prRejected, value: IPullRequestsParamsMetrics.prRejected},
        {name: IPullRequestsParamsMetrics.prClosed, value: IPullRequestsParamsMetrics.prClosed},
        {name: IPullRequestsParamsMetrics.prDone, value: IPullRequestsParamsMetrics.prDone},
    ];

}

export function getGranularity (
    dateFrom: string,
    dateTo: string
): IPullRequestsParamsGranularities[] {

    const granularity = () => {
        return (TimeService.getDiffInUnits(dateFrom, dateTo, 'weeks') >= 4)
            ? [IPullRequestsParamsGranularities.week]
            : [IPullRequestsParamsGranularities.day];
    }

    return granularity();
}

export function buildCharts (
    data: IPullRequestsResponse | undefined,
    type: ChartType
): SeriesOptionsType[] {
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

export function getTimeSeriesData (values: IPullRequestsResponseCalculatedValues[]) {
    return values.map((val) => {
        return [Date.parse(val.date), parseInt(val.values[0])];
    });
}

export function calculateSum (values: IPullRequestsResponseCalculatedValues[]): number {
    const accCalculated = values.reduce((acc, val) => {
        return acc + parseInt(val.values[0]);
    }, 0);
    return accCalculated;
}

export * as PrDashboardServices from './services';
