import React from 'react';
import { waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PullRequestsDashboard } from '@modules/pull-request-dashboard';
import { PrDashboardTestIds } from '@type/test-ids';
import { PrDashboardHelpers } from './helpers';

describe('Pull requests dashboard integration tests', () => {

    it('PullRequestsDashboard functional component should exist', () => {
        expect(PullRequestsDashboard).toBeDefined();
    })

    it('Initial render should contain dates, tabs and add section', async () => {
        const { getByTestId } = PrDashboardHelpers.getMountedInstance();
        const [ sectionDates, sectionTabs, sectionAdd, sectionChart ] = await waitFor(() => {
            return [
                getByTestId(PrDashboardTestIds.sectionDates),
                getByTestId(PrDashboardTestIds.sectionTabs),
                getByTestId(PrDashboardTestIds.sectionAdd),
                getByTestId(PrDashboardTestIds.sectionChart),
            ]
        })
        expect(sectionDates).toBeDefined();
        expect(sectionTabs).toBeDefined();
        expect(sectionAdd).toBeDefined();
        expect(sectionChart).toBeUndefined();
    })

})
