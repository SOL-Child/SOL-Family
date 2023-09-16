package com.accountservice.account.service;

import java.io.IOException;

public interface AccountService {
    void oneTransfer(String identification, String account) throws IOException, InterruptedException;
}
