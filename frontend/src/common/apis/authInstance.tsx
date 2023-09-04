import axios, { AxiosInstance } from 'axios';

// accessToken 필요한 instance
const authInstance: AxiosInstance = axios.create({
    baseURL: '',
});

export default authInstance;
