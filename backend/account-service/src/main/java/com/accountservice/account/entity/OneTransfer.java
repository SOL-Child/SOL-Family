package com.accountservice.account.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class OneTransfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String identification;

    private String code;

    private String account;

    private LocalDateTime exp;

    @Builder
    public OneTransfer(String identification, String code, String account) {
        this.identification = identification;
        this.code = code;
        this.account = account;
    }

    @PrePersist
    private void prePersist() {
        this.exp = LocalDateTime.now().plusMinutes(3);
    }
}
