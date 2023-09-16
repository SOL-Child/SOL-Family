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
export interface ReceiveUserInfo {
    accessToken: string;
    refreshToken: string;
}

// 사용자 가족 정보 (main)
export interface UserFamilyInfo {
    groupName: string;
    groupCnt: string;
}
