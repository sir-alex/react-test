import {
    defaultColumnsChartOptions,
    defaultRepositories,
    defaultTimeLineChartOptions
} from '@root/defaultConfigValues';

export const CONFIG = {
    REPOSITORIES: process.env.REPOSITORIES?.split(' ') || defaultRepositories,
    DEFAULT_DATEPICKER_FORMAT: 'DD/MM/YYYY',
    DEFAULT_PRINT_DATE_FORMAT: 'DD-MM-YYYY',
    DEFAULT_DATE_TO_BE_SENT_FORMAT: 'YYYY-MM-DD',
    DATE_RANGE_LIMIT_DAYS: 90,
    API: {
        HOST: process.env.API_HOST || 'https://api.athenian.co',
        VERSION: process.env.API_VERSION || 'v1',
        ENDPOINTS: {
            PULL_REQUESTS: 'metrics/pull_requests'
        },
        FETCH_OPTIONS: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: 30000
        }
    },
    CHARTS: {
        TIMELINES: defaultTimeLineChartOptions,
        COLUMNS: defaultColumnsChartOptions
    }
}
