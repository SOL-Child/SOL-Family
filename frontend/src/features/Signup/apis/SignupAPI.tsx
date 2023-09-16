import instance from '../../../common/apis/instance';
import { UserInfo } from '../../../common/types/user.types';
import { CertifInfo } from '../../../common/types/user.types';

const SignupAPI = {
    // signup/post
    registerUser: async (data: UserInfo): Promise<boolean> => {
        const res: any = await instance.post('/start/v1/users/signup', data);

        if (res.data.dataHeader.successCode) {
            throw new Error(res.data.dataHeader.resultMessage);
        }
        return true;
    },

    // send certification number/post
    certifyPhoneNumber: async (data: string): Promise<boolean> => {
        const sendData = {
            phone: data,
        };

        const res: any = await instance.post('/start/v1/sms/sends', sendData);
        console.log(res);

        if (res.data.dataHeader.successCode) {
            throw new Error(res.data.dataHeader.resultMessage);
        }

        return true;
    },

    // confirm/post
    checkCertifNumber: async (data: CertifInfo): Promise<boolean> => {
        const res: any = await instance.post('/start/v1/sms/confirms', data);

        if (res.data.dataHeader.successCode) {
            throw new Error(res.data.dataHeader.resultMessage);
        }

        return true;
    },
};

export default SignupAPI;
