package com.accountservice.loan.entity;

import com.accountservice.global.utill.Time;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DialectOverride;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Loan extends Time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 가족 코드
    private String familyCode;

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

    // 승인인
    private String parent;

    @Builder
    public Loan(String familyCode, String identification,String account,String purpose,Integer requestMoney,String solution) {
        this.familyCode = familyCode;
        this.identification = identification;
        this.account = account;
        this.purpose = purpose;
        this.requestMoney = requestMoney;
        this.solution = solution;
        this.requestDate = LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
    }
}
