// sms/req
export interface CertifInfo {
    phone: string;
    certificationNumber: string;
}

// signup/req
export interface UserInfo {
    name: string;
    password: string;
    passwordCheck: string;
    phone: string;
    userType: string;
}

// login/req
export interface SendUserInfo {
    phone: string;
    password: string;
}

// login/res
/**
 * @todo: 사용자 정보 추가
 */
export interface ReceiveUserInfo {
    name: string;
    userType: 'CHILD' | 'PARENT';
    accessToken: string;
    refreshToken: string;
}
