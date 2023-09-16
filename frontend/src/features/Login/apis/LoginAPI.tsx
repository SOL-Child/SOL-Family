import instance from '../../../common/apis/instance';
import { ReceiveUserInfo, SendUserInfo } from '../../../common/types/user.types';

const LoginAPI = {
    loginUser: async (data: SendUserInfo): Promise<ReceiveUserInfo> => {
        const res: any = await instance.post('/start/v1/users/signin', data);

        if (res.data.dataHeader.successCode) {
            throw new Error('로그인에 실패했습니다. 다시 시도해주세요.');
        }

        const userData: ReceiveUserInfo = {
            accessToken: res.data.dataBody.accessToken,
            refreshToken: res.data.dataBody.refreshToken,
        };

        return userData;
    },
};

export default LoginAPI;
