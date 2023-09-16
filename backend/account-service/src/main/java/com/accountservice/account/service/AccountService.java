package com.accountservice.account.service;

import com.accountservice.account.dto.request.ConnectReqDto;

import java.io.IOException;

public interface AccountService {
    void oneTransfer(String identification, String account) throws IOException, InterruptedException;

    void connectAccount(String identification, ConnectReqDto connectReqDto);
}
