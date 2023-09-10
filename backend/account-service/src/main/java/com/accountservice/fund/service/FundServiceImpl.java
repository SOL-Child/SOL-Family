package com.accountservice.fund.service;

import com.accountservice.fund.entity.Fund;
import com.accountservice.fund.repository.JpaFundRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FundServiceImpl implements FundService {

    private final JpaFundRepository jpaFundRepository;

    @Override
    public List<Fund> findFundList() {
        return jpaFundRepository.findAll();
    }
}
