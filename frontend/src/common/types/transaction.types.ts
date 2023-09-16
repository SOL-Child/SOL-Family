export interface TransactionInfo {
    account: string;
    balance: string;
    name: string;
    transactionCount: string;
    transactionDetail: TransactionDetailInfo[];
}

export interface TransactionDetailInfo {
    date: string;
    summary: string;
    withdrawalMoney: string;
    depositMoney: string;
    description: string;
    balance: string;
}
