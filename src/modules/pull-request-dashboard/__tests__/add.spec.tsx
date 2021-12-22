import { screen } from '@testing-library/react';
import { PrDashboardTestIds } from '@type/test-ids';
import { IPullRequestsParamsMetrics } from '@core/services/api/endpoints/pull-requests-api-class';
import { PrDashboardHelpers } from './helpers';
import userEvent from '@testing-library/user-event';

jest.mock('@core/services/request-service');

describe('Add section integration tests', () => {

    beforeAll (() => {
        process.env.IS_TESTMODE = 'true';
    })
    afterAll(() => {
        delete process.env.IS_TESTMODE;
    })

    it('Initial add section should contain text, metric selector, ADD button and handle metric change', () => {
        const { getByTestId } = PrDashboardHelpers.getMountedInstance();
        const addText = getByTestId(PrDashboardTestIds.addText);
        const addMetric = getByTestId(PrDashboardTestIds.addMetric);
        const addBtn = getByTestId(PrDashboardTestIds.addBtn);
        expect(addText).toBeDefined();
        expect(addMetric).toBeDefined();
        expect(addBtn).toBeDefined();
        expect(addBtn).toHaveTextContent('ADD');
        PrDashboardHelpers.selectMetric(addMetric, IPullRequestsParamsMetrics.prReviewCount);
        expect((screen.getByRole('option', {name: IPullRequestsParamsMetrics.prDone}) as HTMLOptionElement).selected).toBeTruthy();
    })

    it('ADD button is enabled only if metric is selected', () => {
        const { getByTestId } = PrDashboardHelpers.getMountedInstance();
        const addBtn = getByTestId(PrDashboardTestIds.addBtn);
        const addMetric = getByTestId(PrDashboardTestIds.addBtn);
        expect(addBtn).toHaveAttribute('disabled');
        PrDashboardHelpers.selectMetric(addMetric, IPullRequestsParamsMetrics.prReviewCount);
        expect(addBtn).not.toHaveAttribute('disabled');
    })

    it('After form submit new created tab should be selected', () => {
        const mountedInstance = PrDashboardHelpers.getMountedInstance();
        PrDashboardHelpers.createTab(mountedInstance, IPullRequestsParamsMetrics.prReviewCount);
        const { getAllByTestId } = mountedInstance;
        const tabs = getAllByTestId(PrDashboardTestIds.tab);
        expect(tabs[0]).toHaveAttribute('data-testid', PrDashboardTestIds.tabActive);
    })

    it('User should be able to switch between tabs', () => {
        const mountedInstance = PrDashboardHelpers.getMountedInstance();
        PrDashboardHelpers.createTab(mountedInstance, IPullRequestsParamsMetrics.prReviewCount);
        PrDashboardHelpers.createTab(mountedInstance, IPullRequestsParamsMetrics.prReviewCount);
        const { getAllByTestId } = mountedInstance;
        const tabs = getAllByTestId(PrDashboardTestIds.tab);
        userEvent.click(tabs[0]);
        expect(tabs[0]).toHaveAttribute('data-testid', PrDashboardTestIds.tabActive);
        userEvent.click(tabs[1]);
        expect(tabs[1]).toHaveAttribute('data-testid', PrDashboardTestIds.tabActive);
    })

});
