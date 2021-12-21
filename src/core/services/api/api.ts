import { PullRequestsApiClass } from '@core/services/api/endpoints/pull-requests-api-class';

class ApiClass {
    public pullRequests: PullRequestsApiClass;
    constructor () {
        this.pullRequests = new PullRequestsApiClass();
    }
}

export const Api = new ApiClass()
