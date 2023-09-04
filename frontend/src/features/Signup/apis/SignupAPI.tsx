import instance from '../../../common/apis/instance';
import UserInfo from '../../../common/interfaces/userInfo.types';
import CertifInfo from '../../../common/interfaces/certifInfo.types';

const SignupAPI = {
    /**
     * 회원가입 / post
     * @param data : 회원가입 시 body에 담기는 데이터
     * @returns : 유저 정보 및 accessToken
     */
    registerUser: async (data: UserInfo): Promise<boolean> => {
        /**
         * @todo: backend 배포 주소 입력
         */
        const res = await instance.post('', data);
        return res.data; // 회원가입 성공 여부
    },

    /**
     * 휴대폰 인증 / post
     * @param data: 사용자가 입력한 휴대폰 번호
     * @returns : 일치 여부
     */
    certifyPhoneNumber: async (data: string): Promise<boolean> => {
        /**
         * @todo: 백엔드 타입 맞추기
         */
        const res = await instance.post('', data);

        return res.data;
    },

    /**
     * 인증번호 확인 / post
     * @param data: 사용자가 입력한 휴대폰 번호, 인증 번호
     * @returns : 일치 여부
     */
    checkCertifNumber: async (data: CertifInfo): Promise<boolean> => {
        const res = await instance.post('', data);
        return res.data;
    },
};

export default SignupAPI;
