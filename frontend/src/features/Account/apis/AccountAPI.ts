import { SendTransferInfo, TransferInfo } from '../../../common/types/account.types';
import authInstance from '../../../common/apis/authInstance';

const AccountAPI = {
    // 계좌 이체 api
    transferMoney: async (data: SendTransferInfo): Promise<TransferInfo> => {
        const res: any = authInstance.post('', data);

        if (res.data.dataHeader.successCode) {
            throw new Error(res.data.dataHeader.resultMessage);
        }

        // @todo 추후 변경
        return res.data.dataHeader;
    },
};

export default AccountAPI;
