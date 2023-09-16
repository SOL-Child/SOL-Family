package com.blockchainservice.ethereum.service;

import java.math.BigInteger;

public interface EthereumService {
    String createAccount(String identification, String realAccount) throws Exception;

    String transfer(String fromPrivateKey, String toAddress, BigInteger amount) throws Exception;
}
