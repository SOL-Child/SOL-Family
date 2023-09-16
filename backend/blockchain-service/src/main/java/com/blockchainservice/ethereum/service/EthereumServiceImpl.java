package com.blockchainservice.ethereum.service;

import com.blockchainservice.ethereum.entity.BookType;
import com.blockchainservice.ethereum.entity.Ethereum;
import com.blockchainservice.ethereum.exception.InvalidEthereumException;
import com.blockchainservice.ethereum.repository.JpaEthereumRepository;
import com.blockchainservice.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.*;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthBlock;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.core.methods.response.Transaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service("ethereumService")
@Transactional
@RequiredArgsConstructor
public class EthereumServiceImpl extends AESEncryption implements EthereumService {

    private final JpaEthereumRepository jpaEthereumRepository;


    @Value("${infura.endpoint}")
    private String infuraEndpoint;
    private final Web3j web3j = Web3j.build(new HttpService(infuraEndpoint));


    @Override
    @Transactional
    public String createAccount(String identification, String realAccount, String bookType) throws Exception {
        ECKeyPair keyPair = Keys.createEcKeyPair();

        WalletFile wallet = Wallet.createStandard(realAccount, keyPair);

        Ethereum ethereum = Ethereum.builder()
                .address("0x" + wallet.getAddress())
                .identification(identification)
                .privateKey(encrypt(keyPair.getPrivateKey().toString()))
                .realAccount(realAccount)
                .bookType(BookType.valueOf(bookType))
                .build();

        jpaEthereumRepository.save(ethereum);

        return "0x" + wallet.getAddress();
    }

    // 이체
    @Override
    @Transactional
    public String transfer(String identification, String toAddress, BigInteger amount) throws Exception {

        Ethereum ethereum = findByIdentification(identification);
        Credentials credentials = Credentials.create(decrypt(ethereum.getPrivateKey()));
        TransactionManager transactionManager = new RawTransactionManager(web3j, credentials);
        Transfer transfer = new Transfer(web3j, transactionManager);

        // 이체 실행
        BigInteger ethAmount = convertKRWToEth(amount);
        TransactionReceipt transactionReceipt = transfer.sendFunds(toAddress, Convert.toWei(String.valueOf(ethAmount), Convert.Unit.ETHER), Convert.Unit.WEI).send();
        return transactionReceipt.getTransactionHash();
    }

    // 계좌 잔액 조회
    public BigInteger getBalance(String address) throws Exception {
        EthGetBalance ethGetBalance = web3j.ethGetBalance(address, DefaultBlockParameterName.LATEST).send();
        return ethGetBalance.getBalance();
    }

    private Ethereum findByIdentification(String identification) {
        return jpaEthereumRepository.findByIdentification(identification)
                .orElseThrow(() -> new InvalidEthereumException(ErrorCode.ETHEREUM_NOT_EXIST));
    }

    private static final BigInteger FIXED_EXCHANGE_RATE = BigInteger.valueOf(2200000); // 1 ETH = 3,000,000 원

    private BigInteger convertKRWToEth(BigInteger krwAmount) {
        return krwAmount.divide(FIXED_EXCHANGE_RATE);
    }

    public List<Transaction> getMonthlyTransactions(String address, int year, int month) throws Exception {
        List<Transaction> transactions = new ArrayList<>();

        LocalDateTime startOfMonth = LocalDateTime.of(year, month, 1, 0, 0, 0);
        LocalDateTime endOfMonth = startOfMonth.plusMonths(1);

        long startTimestamp = startOfMonth.atZone(ZoneId.systemDefault()).toEpochSecond();
        long endTimestamp = endOfMonth.atZone(ZoneId.systemDefault()).toEpochSecond();

        BigInteger startBlock = getBlockNumberByTimestamp(startTimestamp);
        BigInteger endBlock = getBlockNumberByTimestamp(endTimestamp);

        while (startBlock.compareTo(endBlock) <= 0) {
            EthBlock ethBlock = web3j.ethGetBlockByNumber(DefaultBlockParameter.valueOf(startBlock), true).send();

            for (EthBlock.TransactionResult transactionResult : ethBlock.getResult().getTransactions()) {
                Transaction tx = (Transaction) transactionResult.get();

                if (tx.getFrom().equalsIgnoreCase(address) || tx.getTo().equalsIgnoreCase(address)) {
                    transactions.add(tx);
                }
            }

            startBlock = startBlock.add(BigInteger.ONE);
        }

        return transactions;
    }

    public BigInteger getBlockNumberByTimestamp(long targetTimestamp) throws Exception {
        BigInteger startBlock = BigInteger.ZERO;
        BigInteger endBlock = web3j.ethBlockNumber().send().getBlockNumber();

        while (startBlock.compareTo(endBlock) <= 0) {
            BigInteger midBlock = startBlock.add(endBlock).divide(BigInteger.TWO);
            EthBlock ethBlock = web3j.ethGetBlockByNumber(DefaultBlockParameter.valueOf(midBlock), false).send();

            long blockTimestamp = ethBlock.getBlock().getTimestamp().longValueExact();

            if (blockTimestamp < targetTimestamp) {
                startBlock = midBlock.add(BigInteger.ONE);
            } else if (blockTimestamp > targetTimestamp) {
                endBlock = midBlock.subtract(BigInteger.ONE);
            } else {
                return midBlock;
            }
        }

        return startBlock;
    }


    public List<Transaction> getIncomeTransactions(String address, int year, int month) throws Exception {
        List<Transaction> allTransactions = getMonthlyTransactions(address, year, month);
        List<Transaction> incomeTransactions = new ArrayList<>();

        for (Transaction tx : allTransactions) {
            if (tx.getTo().equalsIgnoreCase(address)) {
                incomeTransactions.add(tx);
            }
        }

        return incomeTransactions;
    }

    public List<Transaction> getExpenseTransactions(String address, int year, int month) throws Exception {
        List<Transaction> allTransactions = getMonthlyTransactions(address, year, month);
        List<Transaction> expenseTransactions = new ArrayList<>();

        for (Transaction tx : allTransactions) {
            if (tx.getFrom().equalsIgnoreCase(address)) {
                expenseTransactions.add(tx);
            }
        }

        return expenseTransactions;
    }


}
