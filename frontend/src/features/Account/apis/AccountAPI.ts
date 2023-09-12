import axios from 'axios';
import { SendTransferInfo } from '../../../common/types/account.types';
import authInstance from '../../../common/apis/authInstance';

const AccountAPI = {
    // 계좌 이체 api
    transferMoney: async (data: SendTransferInfo): Promise<boolean> => {
        const res: any = authInstance.post('', data);

        if (res.data.dataHeader.successCode) {
            throw new Error(res.data.dataHeader.resultMessage);
        }

        return true;
    },
};

export default AccountAPI;
