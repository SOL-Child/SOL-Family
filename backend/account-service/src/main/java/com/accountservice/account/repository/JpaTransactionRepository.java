package com.accountservice.account.repository;

import com.accountservice.account.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaTransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByAccount(String account);
}
