package com.accountservice.installmentSavings.service;

import com.accountservice.installmentSavings.entity.InstallmentSavings;

import java.util.List;

public interface InstallmentSavingsService {

    // 적금 상품 목록 조회
    List<InstallmentSavings> findInstallmentSavingsList();
}
