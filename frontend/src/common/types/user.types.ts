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

// 가입된 사용자 정보
export interface SignedUserInfo {
    name: string;
    userType: string;
    family: boolean;
    familyCode?: string;
    familyCnt?: number;
    book: boolean;
    bankbook?: {
        account: number;
        balance: number;
    };
}
