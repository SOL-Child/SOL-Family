package com.accountservice.account.entity;

import com.accountservice.global.entity.Time;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
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

    private String identification;

    private String amount;

    private String depositMemo;

    private String withdrawMemo;

    private String balance;

    private String type;


    @Builder
    public Transfer(Account sender, Account receiver, String amount, String identification, String depositMemo, String withdrawMemo, String balance, String type) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.identification = identification;
        this.depositMemo = depositMemo;
        this.withdrawMemo = withdrawMemo;
        this.balance = balance;
        this.type = type;
    }
}
