package com.accountservice.fund.service;

import com.accountservice.fund.entity.Fund;

import java.util.List;

public interface FundService {
    
    // 펀드 상품 목록 조회
    List<Fund> findFundList();
}
