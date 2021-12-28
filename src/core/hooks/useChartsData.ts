import React from 'react';
import { FinalTabs } from '@modules/pull-request-dashboard/components/tabs-section';
import { Api } from '@core/services/api/api';
import { fixedPostData } from '@modules/pull-request-dashboard/constants/fixed-post-data';
import {
    IPullRequestsError,
    IPullRequestsParamsMetrics,
    IPullRequestsResponse
} from '@core/services/api/endpoints/pull-requests-api-class';
import { useQuery } from 'react-query';
import { CONFIG } from '@root/config';
import { PrDashboardServices } from '@root/modules/pull-request-dashboard/services';
import { TimeService } from '../services/time-service';

export interface IUseChartsData {
    isLoading: boolean;
    data: IPullRequestsResponse | undefined;
    error: IPullRequestsError | null;
}

export function useChartsData (
    tabs: FinalTabs[],
    activeTab: number,
    dateFrom: string,
    dateTo: string
): IUseChartsData {

    const isFetchAllowed = React.useMemo(
        () => {
            return Boolean(
                tabs[activeTab]) &&
                TimeService.isDatesDiffLessThanLimit(dateFrom, dateTo, CONFIG.DATE_RANGE_LIMIT_DAYS, 'days'
            );
        },
        [tabs, activeTab, dateFrom, dateTo]
    )

    const fetchCharts = () => {
        return Api.pullRequests.postData({
            ...fixedPostData,
            metrics: [tabs[activeTab] as IPullRequestsParamsMetrics],
            date_from: dateFrom,
            date_to: dateTo,
            granularities: PrDashboardServices.getGranularity(dateFrom, dateTo)
        });
    };

    const { isLoading, data, error } = useQuery<IPullRequestsResponse, IPullRequestsError>(
        ['charts', dateFrom, dateTo, tabs[activeTab]],
        fetchCharts,
        {
            ...CONFIG.API.FETCH_OPTIONS,
            enabled: isFetchAllowed,
        }
    );

    return {isLoading, data, error}

}

