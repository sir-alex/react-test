import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { PullRequestsDashboard } from '@modules/pull-request-dashboard';
import userEvent, { TargetElement } from '@testing-library/user-event';
import { IPullRequestsParamsMetrics } from '@core/services/api/endpoints/pull-requests-api-class';
import { PrDashboardTestIds } from '@type/test-ids';

export const getMountedInstance = (): RenderResult => {
    return render (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <PullRequestsDashboard/>
        </LocalizationProvider>
    )
}

export const selectMetric = (el: TargetElement, metric: IPullRequestsParamsMetrics): void => {
    userEvent.selectOptions(el, metric);
}

export const createTab = (instance: RenderResult, metric: IPullRequestsParamsMetrics): void => {
    const { getByTestId } = instance;
    const addMetric = getByTestId(PrDashboardTestIds.addMetric);
    const addBtn = getByTestId(PrDashboardTestIds.addBtn);
    selectMetric(addMetric, metric);
    userEvent.click(addBtn);
}

export * as PrDashboardHelpers from './helpers';
