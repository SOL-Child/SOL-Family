package com.authenticationservice.family.entity;


import com.authenticationservice.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.List;


@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Family {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    @OneToMany(mappedBy = "family", cascade = CascadeType.REMOVE)
    private List<User> connectedFamily = new ArrayList<>();


    @Builder
    public Family(String code, User user) {
        this.code = code;
        this.connectedFamily.add(user);
    }

    public void addFamily(User user) {
        this.connectedFamily.add(user);
    }
}
