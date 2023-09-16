package com.accountservice.account.repository;

import com.accountservice.account.entity.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaTransferRepository extends JpaRepository<Transfer, Long> {
}
