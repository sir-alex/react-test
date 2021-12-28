import { CONFIG } from '@root/config';
import { axiosRequest } from '@core/services/axios-request';

export class RequestService {

    public post<T extends unknown>(
        to: string,
        params?: object,
        _?: string
    ): Promise<T> {
        const path = this.buildApiPath(to);
        return axiosRequest.post(path, params);
    }

    private buildApiPath(to: string) : string {
        return `/${CONFIG.API.VERSION}/${to}`;
    }

}
