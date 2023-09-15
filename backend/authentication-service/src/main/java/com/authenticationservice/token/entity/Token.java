package com.authenticationservice.token.entity;

import com.authenticationservice.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "token", length = 512)
    private String token;

    @Builder
    public Token(User user, String token) {
        this.user = user;
        this.token = token;
    }

    public Token(User user) {
        this.user = user;
    }

    public void updateToken(String token) {
        this.token = token;
    }
}
