package com.blockchainservice.ethereum.repository;

import com.blockchainservice.ethereum.entity.Ethereum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaEthereumRepository extends JpaRepository<Ethereum, Long> {
    Optional<Ethereum> findByIdentification(String identification);
}
