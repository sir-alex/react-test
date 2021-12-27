import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { CONFIG } from '@root/config';

export type Props = Highcharts.Options

export const ChartColumns: React.FC<Props> = React.memo(({...props}) => {
    const options: Highcharts.Options = {
        ...CONFIG.CHARTS.COLUMNS,
        series: [
            {
                name: 'athenianco/athenian-webapp-asdasd',
                type: 'column',
                data: [362971]
            },
            {
                name: 'athenianco/athenianasdadsasd-adadsaaasd',
                type: 'column',
                data: [100000]
            },
            {
                name: 'athenianco/fsdfsdfsfd',
                type: 'column',
                data: [200000]
            },
            {
                name: 'athenianco/fsdfsdfsfd',
                type: 'column',
                data: [200000]
            }
        ]
    }
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
});
