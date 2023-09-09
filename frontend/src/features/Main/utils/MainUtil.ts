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
};

export default MainUtil;
