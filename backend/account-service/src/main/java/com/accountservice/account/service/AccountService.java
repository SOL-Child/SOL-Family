package com.accountservice.account.service;

import com.accountservice.account.dto.request.ConnectReqDto;
import com.accountservice.account.dto.request.TransactionReqDto;
import com.accountservice.account.dto.response.MainResDto;
import com.accountservice.account.dto.response.TransactionResDto;
import com.accountservice.account.dto.response.TransferResDto;

import java.io.IOException;

public interface AccountService {
    void oneTransfer(String identification, String account) throws IOException, InterruptedException;

    void connectAccount(String identification, ConnectReqDto connectReqDto, String bookType);

    TransactionResDto transaction(String identification, TransactionReqDto transactionReqDto);

    TransferResDto getTransaction(String identification);

    MainResDto main(String identification) throws IOException, InterruptedException;
}
