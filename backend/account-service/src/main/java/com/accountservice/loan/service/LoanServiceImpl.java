package com.accountservice.loan.service;

import com.accountservice.loan.dto.request.LoanReqDto;
import com.accountservice.loan.dto.response.LoanResDto;
import com.accountservice.loan.entity.Loan;
import com.accountservice.loan.repository.JpaLoanRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LoanServiceImpl implements LoanService {

    private final JpaLoanRepository jpaLoanRepository;

    // 대출 신청
    @Override
    @Transactional
    public void createLoan(LoanReqDto loanReqDto, String auth, String identification) {
        Loan loan = Loan.builder()
                .familyCode(loanReqDto.getFamilyCode())
                .identification(identification)
                // TODO : account 연결
                .account("account")
                .solution(loanReqDto.getSolution())
                .purpose(loanReqDto.getPurpose())
                .requestMoney(loanReqDto.getRequestMoney())
                .build();
        jpaLoanRepository.save(loan);
    }
}