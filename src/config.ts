export const CONFIG = {
    API: {
        HOST: process.env.API_HOST || 'https://api.athenian.co',
        VERSION: process.env.API_VERSION || 'v1',
        ENDPOINTS: {
            PULL_REQUESTS: 'metrics/pull_requests'
        }
    },
}
