import authInstance from './authInstance';
import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * @todo: 요청 전 처리 로직 추가
 */
authInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        /**
         * @todo: accessToken 추가
         */
        // config.headers.Authorization = '';
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    },
);

/**
 * @todo: 요청 후 처리 로직 추가
 */
authInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // console.log(response);

        return response;
    },
    (error: any) => {
        // console.log(error);

        return Promise.reject(error);
    },
);
