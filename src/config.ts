export const CONFIG = {
    DEFAULT_DATEPICKER_FORMAT: 'DD/MM/YYYY',
    DEFAULT_PRINT_DATE_FORMAT: 'DD-MM-YYYY',
    DEFAULT_DATE_TO_BE_SENT_FORMAT: 'YYYY-MM-DD',
    API: {
        HOST: process.env.API_HOST || 'https://api.athenian.co',
        VERSION: process.env.API_VERSION || 'v1',
        ENDPOINTS: {
            PULL_REQUESTS: 'metrics/pull_requests'
        }
    },
}
