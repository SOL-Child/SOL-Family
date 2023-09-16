package com.blockchainservice.ethereum.service;

import java.math.BigInteger;

public interface EthereumService {
    String createAccount(String identification, String realAccount, String bookType) throws Exception;

    String transfer(String identification, String toAddress, BigInteger amount) throws Exception;
}
