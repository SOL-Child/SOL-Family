package com.accountservice.fund.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Fund{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 운용사
    private String company;

    // 상품명
    private String product;

    // 1개월 누적 수익률
    private Double accumulateRevenueOfOneMonth;

    // 3개월 누적 수익률
    private Double accumulateRevenueOfThreeMonth;

    // 6개월 누적 수익률
    private Double accumulateRevenueOfSixMonth;

    // 12개월 누적 수익률
    private Double accumulateRevenueOfOneYear;

    // 펀드 등급
    private Integer grade;
    
    // 펀드 타입
    private String fundType;
    
    // 선취 수수료
    private Double upFrontFee;

    // 총 보수
    private Double totalCompensation;

    @Builder
    public Fund(String company, String product, Double accumulateRevenueOfOneMonth, Double accumulateRevenueOfThreeMonth, Double accumulateRevenueOfSixMonth, Double accumulateRevenueOfOneYear, Integer grade, String fundType, Double upFrontFee, Double totalCompensation) {
        this.company = company;
        this.product = product;
        this.accumulateRevenueOfOneMonth = accumulateRevenueOfOneMonth;
        this.accumulateRevenueOfThreeMonth = accumulateRevenueOfThreeMonth;
        this.accumulateRevenueOfSixMonth = accumulateRevenueOfSixMonth;
        this.accumulateRevenueOfOneYear = accumulateRevenueOfOneYear;
        this.grade = grade;
        this.fundType = fundType;
        this.upFrontFee = upFrontFee;
        this.totalCompensation = totalCompensation;
    }
}