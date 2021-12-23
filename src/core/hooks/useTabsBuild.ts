import React from 'react';
import { AddMetric, FinalTabs } from '@modules/pull-request-dashboard/components/tabs-section';
import { TabItem } from '@core/components/ui-tabs';

export function useTabsBuild (tabs: FinalTabs[]): TabItem<FinalTabs>[] {

    return React.useMemo(() => {
        const finalTabs = tabs.map((tab, ind) => {
            return {
                name: 'Tab ' + (ind + 1),
                value: tab,
                isClosable: true
            }
        });
        finalTabs.push({
            name: 'ADD',
            value: AddMetric.add,
            isClosable: false
        });
        return finalTabs;
    }, [tabs]);

}

