import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export enum ChartType {
    line = 'line',
    column = 'column'
}

interface Props extends Highcharts.Options {
    config: Highcharts.Options
}

export const UiChart: React.FC<Props> = React.memo(({config, ...props}) => {
    const options: Highcharts.Options = {
        ...config,
        ...props
    }
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
});
