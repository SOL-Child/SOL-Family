package com.blockchainservice.ethereum.repository;

import com.blockchainservice.ethereum.entity.Ethereum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaEthereumRepository extends JpaRepository<Ethereum, Long> {

}
