import { PrDashboardTestIds } from '@type/test-ids';
import { PrDashboardHelpers } from './helpers';
import userEvent from '@testing-library/user-event';
import { IPullRequestsParamsMetrics } from '@core/services/api/endpoints/pull-requests-api-class';

jest.mock('@core/services/request-service');

const testMetric = IPullRequestsParamsMetrics.prClosed;

describe('Tab section integration tests', () => {

    beforeAll (() => {
        process.env.IS_TESTMODE = 'true';
    })
    beforeEach (() => {
        localStorage.clear();
    })
    afterAll(() => {
        delete process.env.IS_TESTMODE;
    })

    it('Initial tab section should contain add tab only. No content tabs should be rendered', () => {
        const { queryAllByTestId } = PrDashboardHelpers.getMountedInstance();
        const tabs = queryAllByTestId(PrDashboardTestIds.tab);
        expect(tabs.length).toBe(1);
    })

    it('Tab can be created by selecting metric and clicking to ADD button', () => {
        const mountedInstance = PrDashboardHelpers.getMountedInstance();
        PrDashboardHelpers.createTab(mountedInstance, testMetric);
        const { getAllByTestId } = mountedInstance;
        const tabs = getAllByTestId(PrDashboardTestIds.tab);
        expect(tabs.length).toBe(2);
    })

    it('Tab can be deleted by pressing to close button', () => {
        const mountedInstance = PrDashboardHelpers.getMountedInstance();
        PrDashboardHelpers.createTab(mountedInstance, testMetric);
        const { getByTestId, getAllByTestId } = mountedInstance;
        const tabClose = getByTestId(PrDashboardTestIds.tabClose);
        userEvent.click(tabClose);
        const tabs = getAllByTestId(PrDashboardTestIds.tab);
        expect(tabs.length).toBe(1);
    })

});
