import {
    IPullRequestsParamsGranularities
} from '@core/services/api/endpoints/pull-requests-api-class';
import { CONFIG } from '@root/config';

export const fixedPostData = {
    for: [
        {
            repositories: CONFIG.REPOSITORIES,
            repogroups: CONFIG.REPOSITORIES.map((_, ind) => [ind])
        }
    ],
    granularities: [IPullRequestsParamsGranularities.week],
    exclude_inactive: true,
    account: 1,
    timezone: 60,
};
