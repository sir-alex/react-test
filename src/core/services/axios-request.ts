import axios from 'axios';
import { responseInterceptorError, responseInterceptorSuccess } from '@core/services/response-interceptor';
import { CONFIG } from '@root/config';

export const axiosRequest = axios.create({
    baseURL: CONFIG.API.HOST
});

axiosRequest.interceptors.response.use(
    responseInterceptorSuccess,
    responseInterceptorError
);
