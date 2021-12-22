import { RenderResult, waitFor } from '@testing-library/react';
import { PrDashboardTestIds } from '@type/test-ids';
import { IPullRequestsParamsMetrics } from '@core/services/api/endpoints/pull-requests-api-class';
import { PrDashboardHelpers } from './helpers';
import * as hooks from '@core/hooks/useRequest';
import { Api } from '@core/services/api/api';

jest.mock('@core/services/request-service');

const chartError = require('@core/services/__mockData__/metrics-pull_requests/error.json');

let mountedInstance: RenderResult;
const testMetric = IPullRequestsParamsMetrics.prReviewCount;

describe('Chart section integration tests', () => {

    beforeAll (() => {
        process.env.IS_TESTMODE = 'true';
    })
    beforeEach (() => {
        mountedInstance = PrDashboardHelpers.getMountedInstance();
        PrDashboardHelpers.createTab(mountedInstance, testMetric);
        jest.clearAllMocks();
    })
    afterAll(() => {
        delete process.env.IS_TESTMODE;
    })

    it('Initial chart section should contain metric selected, time chart with KPI , group chart with KPI', async () => {
        const { getByTestId } = mountedInstance;
        const [ chartSelected, chartTime, chartTimeKpi, chartGroups, chartGroupsKpi ] = await waitFor(() => {
            return [
                getByTestId(PrDashboardTestIds.chartSelected),
                getByTestId(PrDashboardTestIds.chartTime),
                getByTestId(PrDashboardTestIds.chartTimeKpi),
                getByTestId(PrDashboardTestIds.chartGroups),
                getByTestId(PrDashboardTestIds.chartGroupsKpi),
            ]
        })
        expect(chartSelected).toBeDefined();
        expect(chartTime).toBeDefined();
        expect(chartTimeKpi).toBeDefined();
        expect(chartGroups).toBeDefined();
        expect(chartGroupsKpi).toBeDefined();
    })

    it('Selected metric should be displayed correct', async () => {
        const { getByTestId } = mountedInstance;
        const [ chartSelected ] = await waitFor(() => {
            return [
                getByTestId(PrDashboardTestIds.chartSelected),
            ]
        })
        expect(chartSelected).toBeDefined();
        expect(chartSelected).toContain(testMetric);
    })

    it('Loading icon should be displayed during loading', async () => {
        jest.spyOn(hooks, 'useRequest').mockImplementation(() => ([() => {}, true, null]))
        const { getByTestId } = mountedInstance;
        const [ chartTimeLoading, chartGroupsLoading ] = await waitFor(() => {
            return [
                getByTestId(PrDashboardTestIds.chartTimeLoading),
                getByTestId(PrDashboardTestIds.chartGroupsLoading),
            ]
        })
        expect(chartTimeLoading).toBeDefined();
        expect(chartGroupsLoading).toBeDefined();
    })

    it('Error icon should be displayed if server returns error', async () => {
        jest.spyOn(Api.pullRequests, 'post').mockImplementation(
            () => Promise.reject(chartError)
        );
        const { getByTestId } = mountedInstance;
        const [ chartError ] = await waitFor(() => {
            return [
                getByTestId(PrDashboardTestIds.chartError),
            ]
        })
        expect(chartError).toBeDefined();
    })

});
