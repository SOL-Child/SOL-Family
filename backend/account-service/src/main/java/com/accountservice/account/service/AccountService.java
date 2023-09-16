package com.accountservice.account.service;

import com.accountservice.account.dto.request.ConnectReqDto;
import com.accountservice.account.dto.request.TransactionReqDto;

import java.io.IOException;

public interface AccountService {
    void oneTransfer(String identification, String account) throws IOException, InterruptedException;

    void connectAccount(String identification, ConnectReqDto connectReqDto, String bookType);

    void transaction(String identification, TransactionReqDto transactionReqDto);
}
