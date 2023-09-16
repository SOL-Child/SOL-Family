package com.blockchainservice.ethereum.service;

import org.web3j.protocol.core.methods.response.Transaction;

import java.math.BigInteger;
import java.util.List;

public interface EthereumService {
    String createAccount(String identification, String realAccount, String bookType) throws Exception;

    String transfer(String identification, String toAddress, BigInteger amount) throws Exception;

    BigInteger getBalance(String address) throws Exception;

    List<Transaction> getMonthlyTransactions(String address, int year, int month) throws Exception;

    List<Transaction> getIncomeTransactions(String address, int year, int month) throws Exception;

    List<Transaction> getExpenseTransactions(String address, int year, int month) throws Exception;
}
