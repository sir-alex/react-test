import { PrDashboardTestIds } from '@type/test-ids';
import { PrDashboardHelpers } from './helpers';
import userEvent from '@testing-library/user-event';
import { IPullRequestsParamsMetrics } from '@core/services/api/endpoints/pull-requests-api-class';

jest.mock('@core/services/request-service');

describe('Tab section integration tests', () => {

    beforeAll (() => {
        process.env.IS_TESTMODE = 'true';
    })
    afterAll(() => {
        delete process.env.IS_TESTMODE;
    })

    it('Initial tab section should contain add tab only. No content tabs should be rendered', () => {
        const { getByTestId, getAllByTestId } = PrDashboardHelpers.getMountedInstance();
        const addTab = getByTestId(PrDashboardTestIds.addTab);
        const tabs = getAllByTestId(PrDashboardTestIds.tab);
        expect(addTab).toBeDefined();
        expect(tabs.length).toBe(0);
    })

    it('Tab can be created by selecting metric and clicking to ADD button', () => {
        const mountedInstance = PrDashboardHelpers.getMountedInstance();
        PrDashboardHelpers.createTab(mountedInstance, IPullRequestsParamsMetrics.prReviewCount);
        const { getAllByTestId } = mountedInstance;
        const tabs = getAllByTestId(PrDashboardTestIds.tab);
        expect(tabs.length).toBe(1);
    })

    it('Tab can be deleted by pressing to close button', () => {
        const mountedInstance = PrDashboardHelpers.getMountedInstance();
        PrDashboardHelpers.createTab(mountedInstance, IPullRequestsParamsMetrics.prReviewCount);
        const { getByTestId, getAllByTestId } = mountedInstance;
        const tabClose = getByTestId(PrDashboardTestIds.tabClose);
        userEvent.click(tabClose);
        const tabs = getAllByTestId(PrDashboardTestIds.tab);
        expect(tabs.length).toBe(0);
    })

});
