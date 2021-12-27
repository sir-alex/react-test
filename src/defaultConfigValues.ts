import Highcharts from 'highcharts';

export const defaultRepositories = [
    "github.com/athenianco/athenian-api",
    "github.com/athenianco/athenian-webapp",
    "github.com/athenianco/infrastructure",
    "github.com/athenianco/metadata"
];

export const defaultTimeLineChartOptions: Highcharts.Options = {
    chart: {
        type: 'line'
    },
    yAxis: {
        title: {
            text: 'Value'
        }
    },
    xAxis: {
        type: 'datetime',
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: true
        }
    },
}

export const defaultColumnsChartOptions: Highcharts.Options = {
    chart: {
        type: 'column'
    },
    yAxis: {
        title: {
            text: 'Value'
        }
    },
    xAxis: {
        visible: false
    },
}
