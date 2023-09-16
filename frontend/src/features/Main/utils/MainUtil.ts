const MainUtil = {
    checkIsLogin: () => {
        if (window.localStorage.getItem('SF_accessToken')) return true;
        return false;
    },
    checkUserType: (): string | null => {
        return window.localStorage.getItem('SF_userType');
    },
    getUserName: (): string | null => {
        return window.localStorage.getItem('SF_userName');
    },
    getAccessToken: () => {
        if (!window.localStorage.getItem('SF_accessToken')) alert('토큰이 없습니다.');
        return window.localStorage.getItem('SF_accessToken');
    },
};

export default MainUtil;
