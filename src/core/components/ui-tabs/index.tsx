/** @jsxImportSource @emotion/react */
import React from 'react';
import { Tab, Tabs } from '@mui/material';
import IconButton from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { CommonService } from '@root/core/services/common-service';
import { PrDashboardTestIds } from '@type/test-ids';
import { tabStyle } from '@core/components/ui-tabs/styles';

export interface TabItem<T> {
    name: string;
    value: T;
    isClosable: boolean;
}

interface Props<T> {
    tabs: TabItem<T>[];
    selectedValue: T;
    onChange: (event: React.SyntheticEvent, value: T) => void;
    onClose: (event: React.SyntheticEvent, value: number) => void;
}

export type GenericPropsUiTabs = <T>(props: Props<T>) => React.ReactElement;

export const UiTabs: GenericPropsUiTabs = (
    {
        tabs,
        selectedValue,
        onChange,
        onClose,
        ...otherProps
    }) => {
    return (
        <Tabs
            value={selectedValue}
            onChange={onChange}
            textColor={'secondary'}
            indicatorColor={'secondary'}
            variant="scrollable"
            scrollButtons={'auto'}
            {...otherProps}
        >
            {tabs.map((tab, ind) =>
                <Tab
                    key={CommonService.generateKey()}
                    value={tab.value}
                    label={
                        <span>
                            <span css={tab.isClosable ? tabStyle : ''}>{tab.name}</span>
                            {tab.isClosable &&
                                <IconButton
                                    component="div"
                                    onClick={(event: any) => onClose(event, ind)}
                                    data-testid={PrDashboardTestIds.tabClose}
                                >
                                    <CloseIcon color={'secondary'} />
                                </IconButton>
                            }
                        </span>
                    }
                    data-testid={PrDashboardTestIds.tab}
                    data-active={tab.isClosable && (selectedValue === tab.value) ? 'true': 'false'}
                />
            )}
        </Tabs>
    );
};
