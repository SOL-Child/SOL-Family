import LoginUserInfo from '../../../common/interfaces/loginUserInfo.types';

const LocalStorageUtil = {
    saveLocalStorage: (data: LoginUserInfo): void => {
        window.localStorage.setItem('SF_name', data.name);
        window.localStorage.setItem('SF_accessToken', data.accessToken);
    },
};

export default LocalStorageUtil;
