import React from 'react';
import { FinalTabs, TabItem } from '@modules/pull-request-dashboard/components/tabs-section';

export function useTabsBuild (tabs: FinalTabs[]): TabItem[] {

    const memoisedTabs = React.useMemo(() => {
        const finalTabs = tabs.map((tab, ind) => {
            return {
                name: 'Tab ' + (ind + 1),
                value: ind,
                isClosable: true
            }
        });
        finalTabs.push({
            name: 'ADD',
            value: finalTabs.length,
            isClosable: false
        });
        return finalTabs;
    }, [tabs]);

    return memoisedTabs;

}

