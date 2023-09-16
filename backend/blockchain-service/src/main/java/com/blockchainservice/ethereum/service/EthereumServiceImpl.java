package com.blockchainservice.ethereum.service;

import com.blockchainservice.ethereum.entity.Ethereum;
import com.blockchainservice.ethereum.repository.JpaEthereumRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.crypto.ECKeyPair;
import org.web3j.crypto.Keys;
import org.web3j.crypto.Wallet;
import org.web3j.crypto.WalletFile;

@Service("ethereumService")
@Transactional
@RequiredArgsConstructor
public class EthereumServiceImpl extends Encrypt implements EthereumService {

    private final JpaEthereumRepository jpaEthereumRepository;

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



}
