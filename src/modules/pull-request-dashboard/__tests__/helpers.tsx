import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { PullRequestsDashboard } from '@modules/pull-request-dashboard';
import userEvent, { TargetElement } from '@testing-library/user-event';
import { IPullRequestsParamsMetrics } from '@core/services/api/endpoints/pull-requests-api-class';
import { PrDashboardTestIds } from '@type/test-ids';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const getMountedInstance = (): RenderResult => {
    return render (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <QueryClientProvider client={queryClient}>
                <PullRequestsDashboard/>
            </QueryClientProvider>
        </LocalizationProvider>
    )
}

export const selectMetric = (el: TargetElement, metric: IPullRequestsParamsMetrics): void => {
    userEvent.selectOptions(el, metric);
}

export const createTab = (instance: RenderResult, metric: IPullRequestsParamsMetrics): void => {
    const { getByTestId, getAllByTestId } = instance;
    const tabs = getAllByTestId(PrDashboardTestIds.tab);
    userEvent.click(tabs[tabs.length-1]);
    const addMetric = getByTestId(PrDashboardTestIds.addMetric);
    const addMetricSelect = addMetric.querySelector('select');
    const addBtn = getByTestId(PrDashboardTestIds.addBtn);
    selectMetric(addMetricSelect!, metric);
    userEvent.click(addBtn);
}

export * as PrDashboardHelpers from './helpers';
