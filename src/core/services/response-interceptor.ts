import { AxiosResponse } from 'axios';

export function responseInterceptorSuccess(
    response: AxiosResponse
): any {
    return response.data;
}

export function responseInterceptorError(
    error: any,
): Promise<any> {
    return Promise.reject(error);
}
