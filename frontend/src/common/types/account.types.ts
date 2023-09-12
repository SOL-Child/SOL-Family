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

// account.autotransfer/req
export interface AutoTransferInfo {
    accountNum: string;
    transferMoney: string;
    cycle: string;
    selectedDate: string;
}
