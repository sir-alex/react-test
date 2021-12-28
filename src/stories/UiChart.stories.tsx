import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ChartType, UiChart } from '@core/components/ui-chart';
import { CONFIG } from '@root/config';
import { PrDashboardServices } from '@root/modules/pull-request-dashboard/services';

const chartResponse = require('@core/services/__mockData__/metrics-pull_requests/pr-closed.json');

export default {
    title: 'Ui/Chart',
    component: UiChart,
    argTypes: {
        text: {control: 'text'}
    },
} as ComponentMeta<typeof UiChart>;

const Template: ComponentStory<typeof UiChart> = (args) => <UiChart {...args}/>;

const timeSeries = PrDashboardServices.buildCharts(chartResponse, ChartType.line);
const columnSeries = PrDashboardServices.buildCharts(chartResponse, ChartType.column);

export const Series = Template.bind({});
Series.args = {
    config: CONFIG.CHARTS.TIMELINES,
    title: {text: 'Time series'},
    series: timeSeries
};

export const Columns = Template.bind({});
Columns.args = {
    config: CONFIG.CHARTS.COLUMNS,
    title: {text: 'Columns'},
    series: columnSeries
};

