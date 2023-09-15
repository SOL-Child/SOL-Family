package com.accountservice.loan.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoanReqDto {

    // 가족 코드
    private String familyCode;
    
    // 대출 용도
    private String purpose;

    // 대출 금액
    private Integer requestMoney;

    // 대출 구제 방법
    private String solution;

    @Builder
    public LoanReqDto(String familyCode,String purpose, Integer requestMoney, String solution) {
        this.familyCode = familyCode;
        this.purpose = purpose;
        this.requestMoney = requestMoney;
        this.solution = solution;
    }
}
