package com.accountservice.installmentSavings.repository;

import com.accountservice.installmentSavings.entity.InstallmentSavings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaInstallmentSavingsRepository extends JpaRepository<InstallmentSavings, Long> {

}