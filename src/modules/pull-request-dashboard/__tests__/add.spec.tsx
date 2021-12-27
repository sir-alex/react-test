import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PrDashboardTestIds } from '@type/test-ids';
import { IPullRequestsParamsMetrics } from '@core/services/api/endpoints/pull-requests-api-class';
import { PrDashboardHelpers } from './helpers';
import userEvent from '@testing-library/user-event';

describe('Add section integration tests', () => {

    beforeAll (() => {
        process.env.IS_TESTMODE = 'true';
    })
    afterAll(() => {
        delete process.env.IS_TESTMODE;
    })

    it('Initial add section should contain text, metric selector, ADD button', () => {
        const { getByTestId } = PrDashboardHelpers.getMountedInstance();
        const addText = getByTestId(PrDashboardTestIds.addText);
        const addMetric = getByTestId(PrDashboardTestIds.addMetric);
        const addBtn = getByTestId(PrDashboardTestIds.addBtn);
        expect(addText).toBeDefined();
        expect(addMetric).toBeDefined();
        expect(addBtn).toBeDefined();
        expect(addBtn).toHaveTextContent('ADD');
    })

    it('Metric select can update value', () => {
        const { getByTestId } = PrDashboardHelpers.getMountedInstance();
        const addMetric = getByTestId(PrDashboardTestIds.addMetric);
        const addMetricSelect = addMetric.querySelector('select');
        PrDashboardHelpers.selectMetric(addMetricSelect!, IPullRequestsParamsMetrics.prReviewCount);
        expect((screen.getByRole('option', {name: IPullRequestsParamsMetrics.prReviewCount}) as HTMLOptionElement).selected).toBeTruthy();
    });

    it('ADD button is enabled only if metric is selected', () => {
        const { getByTestId } = PrDashboardHelpers.getMountedInstance();
        const addMetric = getByTestId(PrDashboardTestIds.addMetric);
        const addMetricSelect = addMetric.querySelector('select');
        const addBtn = getByTestId(PrDashboardTestIds.addBtn);
        expect(addBtn).toHaveAttribute('disabled');
        PrDashboardHelpers.selectMetric(addMetricSelect!, IPullRequestsParamsMetrics.prReviewCount);
        expect(addBtn).not.toHaveAttribute('disabled');
    })

    it('After form submit new created tab should be selected', () => {
        const mountedInstance = PrDashboardHelpers.getMountedInstance();
        PrDashboardHelpers.createTab(mountedInstance, IPullRequestsParamsMetrics.prReviewCount);
        const { getAllByTestId } = mountedInstance;
        const tabs = getAllByTestId(PrDashboardTestIds.tab);
        expect(tabs.length).toBe(2);
        expect(tabs[0]).toHaveAttribute('data-active', 'true');
    })

    it('After form submit metric select should be dropped', () => {
        const mountedInstance = PrDashboardHelpers.getMountedInstance();
        PrDashboardHelpers.createTab(mountedInstance, IPullRequestsParamsMetrics.prReviewCount);
        const { getAllByTestId, getByTestId } = mountedInstance;
        const tabs = getAllByTestId(PrDashboardTestIds.tab);
        userEvent.click(tabs[1]);
        const addBtn = getByTestId(PrDashboardTestIds.addBtn);
        expect(addBtn).toHaveAttribute('disabled');
    })

});
