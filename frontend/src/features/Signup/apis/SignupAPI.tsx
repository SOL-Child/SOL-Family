import instance from '../../../common/apis/instance';
import { UserInfo, CertifInfo } from '../../../common/types/user.types';

const SignupAPI = {
    // 회원가입/post
    registerUser: async (data: UserInfo): Promise<boolean> => {
        const res: any = await instance.post('/v1/users/signup', data);

        if (res.dataHeader.successCode) {
            throw new Error(res.dataHeader.resultMessage);
        }

        return true; // 회원가입 성공 여부
    },

    // 휴대폰 인증 / post
    certifyPhoneNumber: async (data: string): Promise<boolean> => {
        const sendPhoneData = {
            phone: data,
        };

        const res: any = await instance.post('/v1/sms/sends', sendPhoneData);

        if (res.dataHeader.successCode) {
            throw new Error('휴대폰 인증에 실패하였습니다. 다시 시도해주세요.');
        }

        return true;
    },

    // 인증번호 확인 / post
    checkCertifNumber: async (data: CertifInfo): Promise<boolean> => {
        const res: any = await instance.post('/v1/sms/confirms', data);

        if (res.dataHeader.successCode) {
            if (res.dataHeader.successCode === 403) {
                throw new Error('인증번호가 일치하지 않습니다. 다시 시도해주세요.');
            }

            throw new Error('인증번호 확인에 실패했습니다. 다시 시도해주세요.');
        }

        return true;
    },
};

export default SignupAPI;
