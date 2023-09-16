package com.accountservice.account.entity;


import com.accountservice.global.entity.Time;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Transaction extends Time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String account;

    private String summary;

    private String withdrawalMoney;

    private String depositMoney;

    private String description;

    private String balance;

    @Builder
    public Transaction(String account, String summary, String withdrawalMoney, String depositMoney, String description, String balance) {
        this.account = account;
        this.summary = summary;
        this.withdrawalMoney = withdrawalMoney;
        this.depositMoney = depositMoney;
        this.description = description;
        this.balance = balance;
    }
}
