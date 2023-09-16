import axios, { AxiosInstance } from 'axios';

// accessToken이 필요하지 않은 instance
const instance: AxiosInstance = axios.create({
    baseURL: 'https://www.solfamily-shinhan.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;

// baseURL 작성 시 api 호출할 때 /user/signup 만 적어줘도 됨
