import axios, { AxiosInstance } from 'axios';

// accessToken이 필요하지 않은 instance
const instance: AxiosInstance = axios.create({
    baseURL: '',
});

export default instance;
