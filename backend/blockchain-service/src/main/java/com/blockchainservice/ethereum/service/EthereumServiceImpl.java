package com.blockchainservice.ethereum.service;

import com.blockchainservice.ethereum.entity.Ethereum;
import com.blockchainservice.ethereum.repository.JpaEthereumRepository;
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
public class EthereumServiceImpl extends Encrypt implements EthereumService {

    private final JpaEthereumRepository jpaEthereumRepository;


    @Value("${infura.endpoint}")
    private String infuraEndpoint;
    private final Web3j web3j = Web3j.build(new HttpService(infuraEndpoint));


    @Override
    @Transactional
    public String createAccount(String identification, String realAccount) throws Exception {
        ECKeyPair keyPair = Keys.createEcKeyPair();
        String salt = getSALT();
        String privateKey = hashing(keyPair.getPrivateKey().toByteArray(), salt);

        WalletFile wallet = Wallet.createStandard(realAccount, keyPair);

        Ethereum ethereum = Ethereum.builder()
                .address("0x" + wallet.getAddress())
                .identification(identification)
                .privateKey(privateKey)
                .salt(salt)
                .realAccount(realAccount)
                .build();

        jpaEthereumRepository.save(ethereum);

        return "0x" + wallet.getAddress();
    }

    // 이체
    @Override
    @Transactional
    public String transfer(String fromPrivateKey, String toAddress, BigInteger amount) throws Exception {
        Credentials credentials = Credentials.create(fromPrivateKey);
        TransactionManager transactionManager = new RawTransactionManager(web3j, credentials);
        Transfer transfer = new Transfer(web3j, transactionManager);

        // 이체 실행
        TransactionReceipt transactionReceipt = transfer.sendFunds(toAddress, Convert.toWei(String.valueOf(amount), Convert.Unit.ETHER), Convert.Unit.WEI).send();
        return transactionReceipt.getTransactionHash();
    }

}
