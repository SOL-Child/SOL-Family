import instance from '../../../common/apis/instance';
import { ReceiveUserInfo, SendUserInfo } from '../../../common/types/user.types';

const LoginAPI = {
    loginUser: async (data: SendUserInfo): Promise<ReceiveUserInfo> => {
        const res: any = await instance.post('/v1/users/signin', data);

        if (res.dataHeader.successCode) {
            throw new Error('로그인에 실패했습니다. 다시 시도해주세요.');
        }

        const userData: ReceiveUserInfo = {
            name: res.dataBody.name,
            userType: res.dataBody.userType,
            accessToken: res.dataBody.accessToken,
            refreshToken: res.dataBody.refreshToken,
        };

        return userData;
    },
};

export default LoginAPI;
