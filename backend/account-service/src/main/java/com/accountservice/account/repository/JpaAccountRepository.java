package com.accountservice.account.repository;

import com.accountservice.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaAccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByAccount(String account);
}
