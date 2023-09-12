package com.accountservice.installmentSavings.service;

import com.accountservice.installmentSavings.entity.InstallmentSavings;
import com.accountservice.installmentSavings.repository.JpaInstallmentSavingsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class InstallmentSavingsServiceImpl implements InstallmentSavingsService {

    private final JpaInstallmentSavingsRepository jpaInstallmentSavingsRepository;

    @Override
    public List<InstallmentSavings> findInstallmentSavingsList() { return jpaInstallmentSavingsRepository.findAll(); }
}