package com.accountservice.installmentSavings.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InstallmentSavings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 상품명
    private String product;

    // 가입대상
    private String joinTarget;

    // 가입기간
    private String joinPeriod;

    // 가입금액
    private String joinAmount;

    // 상품개요
    private String productOverview;

    // 이자지급방식
    private String interestPaymentMethod;

    // 세금
    private String tax;

    // 저축방법
    private String savingMethod;

    // 자동재예치
    private String automaticReDeposit;

    // 일부해지
    private String partialCancel;

    // 기본이자율
    private String basicInterestRate;

    // 우대이자율
    private String preferentialInterestRate;

    // 최종이자율
    private String finalInterestRate;

    // 설명
    private String description;

    @Builder
    public InstallmentSavings(String product,String joinTarget,String joinPeriod,String joinAmount,String productOverview,String interestPaymentMethod,String tax,String savingMethod,String automaticReDeposit,String partialCancel,String basicInterestRate,String preferentialInterestRate,String finalInterestRate,String description) {
        this.product = product;
        this.joinTarget = joinTarget;
        this.joinPeriod = joinPeriod;
        this.joinAmount = joinAmount;
        this.productOverview = productOverview;
        this.interestPaymentMethod = interestPaymentMethod;
        this.tax = tax;
        this.savingMethod = savingMethod;
        this.automaticReDeposit = automaticReDeposit;
        this.partialCancel = partialCancel;
        this.basicInterestRate = basicInterestRate;
        this.preferentialInterestRate = preferentialInterestRate;
        this.finalInterestRate = finalInterestRate;
        this.description = description;
    }
}