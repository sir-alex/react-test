import axios from 'axios';
import { CONFIG } from '@root/config';

export class RequestService {

    public post<T extends unknown>(
        to: string,
        params?: object
    ): Promise<T> {
        const fullPath = this.buildApiPath(to);
        return axios.post(fullPath, params);
    }

    private buildApiPath(to: string) : string {
        return `${CONFIG.API.HOST}/${CONFIG.API.VERSION}/${to}`;
    }

}
