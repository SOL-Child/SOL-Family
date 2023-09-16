package com.accountservice.account.dto.response;


import com.accountservice.account.entity.Transaction;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TransactionDetailDto {

    private LocalDateTime date;
    private String summary;
    private String withdrawalMoney;
    private String depositMoney;
    private String description;
    private String balance;

    public TransactionDetailDto of(Transaction transaction) {
        TransactionDetailDto res = new TransactionDetailDto();
        res.date = transaction.getCreatedTime();
        res.summary = transaction.getSummary();
        res.withdrawalMoney = transaction.getWithdrawalMoney();
        res.depositMoney = transaction.getDepositMoney();
        res.description = transaction.getDescription();
        res.balance = transaction.getBalance();
        return res;
    }
}
