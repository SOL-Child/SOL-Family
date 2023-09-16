package com.accountservice.account.entity;


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
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String account;

    private String identification;

    @Enumerated(value = EnumType.STRING)
    private BookType bookType;


    @Builder
    public Account(String account, String identification, BookType bookType) {
        this.account = account;
        this.identification = identification;
        this.bookType = bookType;
    }
}
