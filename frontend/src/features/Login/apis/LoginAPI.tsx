import instance from '../../../common/apis/instance';
import LoginUserInfo from '../../../common/interfaces/loginUserInfo.types';

interface SendUserInfo {
    phone: string;
    password: string;
}

const LoginAPI = {
    loginUser: async (data: SendUserInfo): Promise<LoginUserInfo> => {
        try {
            const res = await instance.post('', data);
            return res.data;
        } catch (err) {
            throw new Error();
        }
    },
};

export default LoginAPI;
