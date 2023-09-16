package com.accountservice.account.entity;

import com.accountservice.global.entity.Time;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Transfer extends Time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account receiver;

    private String amount;

    private String depositMemo;

    private String withdrawMemo;

    private String balance;

    private String type;

    private String transaction_hash;

    @Builder
    public Transfer(Account sender, Account receiver, String amount, String depositMemo, String withdrawMemo, String balance, String type, String transaction_hash) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.depositMemo = depositMemo;
        this.withdrawMemo = withdrawMemo;
        this.balance = balance;
        this.type = type;
        this.transaction_hash = transaction_hash;
    }
}
