package com.accountservice.account.dto.response;

import com.accountservice.account.entity.Account;
import com.accountservice.account.entity.Transaction;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TransferResDto {
    private String account;
    private String balance;
    private int transactionCount;
    private List<TransactionDetailDto> transactionDetail;

    public TransferResDto of(Account account, List<TransactionDetailDto> transactionDetail) {
        TransferResDto res = new TransferResDto();
        res.account = account.getAccount();
        res.balance = account.getBalance();
        res.transactionCount = transactionDetail.size();
        res.transactionDetail = transactionDetail;
        return res;
    }

}
