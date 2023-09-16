package com.accountservice.account.repository;

import com.accountservice.account.entity.OneTransfer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaOneTransferRepository extends JpaRepository<OneTransfer, Long> {
    Optional<OneTransfer> findByAccount(String account);
}
