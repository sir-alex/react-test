import { RenderResult, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PrDashboardTestIds } from '@type/test-ids';
import { IPullRequestsParamsMetrics } from '@core/services/api/endpoints/pull-requests-api-class';
import { PrDashboardHelpers } from './helpers';
import * as hooks from '@core/hooks/useChartsData';

jest.mock('@core/services/request-service');

let mountedInstance: RenderResult;
const testMetric = IPullRequestsParamsMetrics.prClosed;

describe('Chart section integration tests', () => {

    beforeAll (() => {
        process.env.IS_TESTMODE = 'true';
    })
    beforeEach (() => {
        localStorage.clear();
        mountedInstance = PrDashboardHelpers.getMountedInstance();
        PrDashboardHelpers.createTab(mountedInstance, testMetric);
        jest.clearAllMocks();
    })
    afterAll(() => {
        delete process.env.IS_TESTMODE;
    })

    it('Initial chart section should contain metric selected, series chart, grouped chart', async () => {
        const { getByTestId } = mountedInstance;
        const [ chartSelected, chartTime, chartGroups ] = await waitFor(() => {
            return [
                getByTestId(PrDashboardTestIds.chartSelected),
                getByTestId(PrDashboardTestIds.chartTime),
                getByTestId(PrDashboardTestIds.chartGroups),
            ]
        })
        expect(chartSelected).toBeDefined();
        expect(chartTime).toBeDefined();
        expect(chartGroups).toBeDefined();
    })

    it('Selected metric should be displayed correct', async () => {
        const { getByTestId } = mountedInstance;
        const [ chartSelected ] = await waitFor(() => {
            return [
                getByTestId(PrDashboardTestIds.chartSelected),
            ]
        })
        expect(chartSelected).toBeDefined();
        expect(chartSelected).toHaveTextContent(testMetric);
    })

});

describe('Chart section spy integration tests', () => {
    beforeAll (() => {
        process.env.IS_TESTMODE = 'true';
    })
    beforeEach (() => {
        localStorage.clear();
        jest.clearAllMocks();
    })
    afterAll(() => {
        delete process.env.IS_TESTMODE;
    })

    it('Error icon should be displayed if server returns error', async () => {
        const chartErrorResponse = require('@core/services/__mockData__/metrics-pull_requests/error.json');
        const apiSpy = jest.spyOn(hooks, 'useChartsData').mockReturnValue({
            isLoading: false,
            data: undefined,
            error: chartErrorResponse
        });
        const mountedInstance = PrDashboardHelpers.getMountedInstance();
        const { getByTestId } = mountedInstance;
        const [ chartError ] = await waitFor(() => {
            return [
                getByTestId(PrDashboardTestIds.chartError),
            ]
        })
        expect(apiSpy).toHaveBeenCalled();
        expect(chartError).toBeDefined();
    })

    it('Loading icon should be displayed during loading', async () => {
        const apiSpy = jest.spyOn(hooks, 'useChartsData').mockReturnValue({
            isLoading: true,
            data: undefined,
            error: null
        });
        const mountedInstance = PrDashboardHelpers.getMountedInstance();
        PrDashboardHelpers.createTab(mountedInstance, testMetric);
        const { getAllByTestId } = mountedInstance;
        const [ chartLoading ] = await waitFor(() => {
            return [
                getAllByTestId(PrDashboardTestIds.chartLoading),
            ]
        })
        expect(apiSpy).toHaveBeenCalled();
        expect(chartLoading.length).toBe(2);
    })
});
