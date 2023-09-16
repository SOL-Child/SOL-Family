package com.blockchainservice.ethereum.entity;

import com.blockchainservice.global.entity.Time;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Ethereum extends Time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String identification;

    private String address;

    private String privateKey;

    private String realAccount;

    @Enumerated(value = EnumType.STRING)
    private BookType bookType;

    @Builder
    public Ethereum(String identification, String address, String privateKey, String realAccount, BookType bookType) {
        this.identification = identification;
        this.address = address;
        this.privateKey = privateKey;
        this.realAccount = realAccount;
        this.bookType = bookType;
    }
}
