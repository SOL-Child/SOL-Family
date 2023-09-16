package com.accountservice.account.dto.response;

import com.accountservice.account.entity.Transfer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionResDto {

    private String withdrawalAccount;
    private String depositAccount;
    private String money;
    private String depositMemo;
    private String withdrawalMemo;
    private String balance;

    public TransactionResDto of(Transfer transfer){
        TransactionResDto res = new TransactionResDto();
        res.withdrawalAccount = transfer.getSender().getAccount();
        res.depositAccount = transfer.getReceiver().getAccount();
        res.money = transfer.getAmount();
        res.depositMemo = transfer.getDepositMemo();
        res.withdrawalMemo = transfer.getWithdrawMemo();
        res.balance = transfer.getBalance();
        return res;
    }
}
