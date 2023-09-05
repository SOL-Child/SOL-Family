package com.authenticationservice.user.entity;

import com.authenticationservice.global.entity.Time;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class User extends Time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String password;

    private String phone;

    @Enumerated(value = EnumType.STRING)
    private Auth auth;

    private Boolean active;

    @Builder
    public User(String name, String password, String phone, Auth auth, Boolean active) {
        this.name = name;
        this.password = password;
        this.phone = phone;
        this.auth = auth;
        this.active = active;
    }

}
