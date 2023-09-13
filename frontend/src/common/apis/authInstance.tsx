import axios, { AxiosInstance } from 'axios';

// accessToken 필요한 instance
const authInstance: AxiosInstance = axios.create({
    // baseURL: 'https://www.solfamily-shinhan.com/v1',
    baseURL: 'http://ec2-3-39-231-31.ap-northeast-2.compute.amazonaws.com:8080/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default authInstance;
