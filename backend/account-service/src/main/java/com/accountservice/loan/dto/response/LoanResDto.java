package com.accountservice.loan.dto.response;

import com.accountservice.loan.entity.Loan;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class LoanResDto {

    // 대출 신청자
    private String identification;

    // 대출 계좌
    private String account;

    // 대출 요청 날짜
    private LocalDateTime requestDate;

    // 대출 용도
    private String purpose;

    // 대출 요청 금액
    private Integer requestMoney;

    // 대출 구제 방법
    private String solution;

    // 대출 상태
    private String state;

    public LoanResDto of(Loan loan) {
        LoanResDto res = new LoanResDto();
        res.identification = loan.getIdentification();
        res.account = loan.getAccount();
        res.requestDate = loan.getRequestDate();
        res.purpose = loan.getPurpose();
        res.requestMoney = loan.getRequestMoney();
        res.solution = loan.getSolution();
        res.state = loan.getState();
        return res;
    }
}
