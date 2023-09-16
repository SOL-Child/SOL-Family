package com.accountservice.account.entity;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String account;

    private String identification;

    private String balance;

    @Enumerated(value = EnumType.STRING)
    private BookType bookType;


    @Builder
    public Account(String account, String identification, String balance, BookType bookType) {
        this.account = account;
        this.identification = identification;
        this.balance = balance;
        this.bookType = bookType;
    }
}
