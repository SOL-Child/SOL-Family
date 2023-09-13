import axios, { AxiosInstance } from 'axios';

// accessToken이 필요하지 않은 instance
const instance: AxiosInstance = axios.create({
    // baseURL: 'https://www.solfamily-shinhan.com/v1',
    baseURL: 'http://ec2-3-39-231-31.ap-northeast-2.compute.amazonaws.com:8080/v1',
    headers: {
        'Content-Type': 'application/json',
        Authorization: '',
    },
});

export default instance;

// baseURL 작성 시 api 호출할 때 /user/signup 만 적어줘도 됨
