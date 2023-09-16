package com.accountservice.account.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionReqDto {
    private String withdrawalAccount;
    private String depositAccount;
    private String money;
    private String depositMemo;
    private String withdrawalMemo;
}
