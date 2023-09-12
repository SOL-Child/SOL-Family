// account/transfer
export interface SendTransferInfo {
    accountNum: string;
    transferMoney: string;
}

// account/transfer/res
export interface TransferInfo {
    receiverName: string;
    receiveMoney: string;
    sendAccountNum: string;
    receiveAccountNum: string;
}
