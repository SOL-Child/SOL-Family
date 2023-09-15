package com.accountservice.loan.repository;

import com.accountservice.loan.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaLoanRepository extends JpaRepository<Loan, Long> {
}
