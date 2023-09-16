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
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;

import java.math.BigInteger;

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
        TransactionReceipt transactionReceipt = transfer.sendFunds(toAddress, Convert.toWei(String.valueOf(amount), Convert.Unit.ETHER), Convert.Unit.WEI).send();
        return transactionReceipt.getTransactionHash();
    }

    private Ethereum findByIdentification(String identification) {
        return jpaEthereumRepository.findByIdentification(identification)
                .orElseThrow(() -> new InvalidEthereumException(ErrorCode.ETHEREUM_NOT_EXIST));
    }

}
