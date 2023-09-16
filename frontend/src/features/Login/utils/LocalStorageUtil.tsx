import { ReceiveUserInfo } from '../../../common/types/user.types';

const LocalStorageUtil = {
    saveLocalStorage: (data: ReceiveUserInfo): void => {
        window.localStorage.setItem('SF_accessToken', data.accessToken);
        window.localStorage.setItem('SF_refreshToken', data.refreshToken);
    },
};

export default LocalStorageUtil;
