import { CONFIG } from '@root/config';
import { RequestService } from '@core/services/request-service';

/*
* TS contains only params used in FE. Full list of params available in
* https://api.athenian.co/v1/ui/#/metrics/calc_metrics_prs
* */

export enum IPullRequestsParamsMetrics {
    prWipTime = 'pr-wip-time',
    prWipCount = 'pr-wip-count',
    prReviewTime = 'pr-review-time',
    prReviewCount = 'pr-review-count',
    prMergingTime = 'pr-merging-time',
    prMergingCount = 'pr-merging-count',
    prReleaseTime = 'pr-release-time',
    prReleaseCount = 'pr-release-count',
    prLeadTime = 'pr-lead-time',
    prLeadCount = 'pr-lead-count',
    prCycleTime = 'pr-cycle-time',
    prCycleCount = 'pr-cycle-count',
    prCycleOpened = 'pr-opened',
    prReviewed = 'pr-reviewed',
    prNotReviewed = 'pr-not-reviewed',
    prMerged = 'pr-merged',
    prRejected = 'pr-rejected',
    prClosed = 'pr-closed',
    prDone = 'pr-done'
}

export enum IPullRequestsParamsGranularities {
    day = 'day',
    week = 'week',
    month = 'month',
    year = 'year',
    all = 'all'
}

export interface IPullRequestsParamsFor {
    repositories: string[];
    repogroups?: [number[]];
}

export interface IPullRequestsParams {
    for: IPullRequestsParamsFor[];
    metrics: IPullRequestsParamsMetrics[];
    date_from: string;
    date_to: string;
    granularities: IPullRequestsParamsGranularities[];
    exclude_inactive: boolean;
    account: number;
    timezone?: number;
}

export interface IPullRequestsResponseCalculatedValues {
    date: string;
    values: any[];
}

export interface IPullRequestsResponseCalculated {
    for: IPullRequestsParamsFor;
    granularity: IPullRequestsParamsGranularities;
    values: IPullRequestsResponseCalculatedValues[];
}

export interface IPullRequestsResponse extends Omit<IPullRequestsParams, 'for'> {
    calculated: IPullRequestsResponseCalculated[];
}

export interface IPullRequestsError {
    type: string;
    title: string;
    detail: string;
    status: number;
}

export class PullRequestsApiClass extends RequestService {
    public async postOrder (params: IPullRequestsParams): Promise<IPullRequestsResponse> {
        const apiPath = CONFIG.API.ENDPOINTS.PULL_REQUESTS;
        return this.post<IPullRequestsResponse>(apiPath, params);
    }
}
