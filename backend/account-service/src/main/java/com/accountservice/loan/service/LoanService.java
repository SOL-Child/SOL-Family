package com.accountservice.loan.service;

import com.accountservice.loan.dto.request.LoanReqDto;
import com.accountservice.loan.dto.response.LoanResDto;
import com.accountservice.loan.entity.Loan;

public interface LoanService {

    // 대출 신청
    void createLoan(LoanReqDto loanReqDto, String auth, String identification);
}
