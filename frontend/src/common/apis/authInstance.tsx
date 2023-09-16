import axios, { AxiosInstance } from 'axios';

// accessToken 필요한 instance
const authInstance: AxiosInstance = axios.create({
    baseURL: 'https://www.solfamily-shinhan.com',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('SF_accessToken')}`,
    },
});

export default authInstance;
