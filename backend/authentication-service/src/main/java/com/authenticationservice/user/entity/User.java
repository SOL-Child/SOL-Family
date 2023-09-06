package com.authenticationservice.user.entity;

import com.authenticationservice.global.entity.Time;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class User extends Time implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String password;

    private String phone;

    @Enumerated(value = EnumType.STRING)
    private UserType userType;

    private Boolean active;

    @Builder
    public User(String name, String password, String phone, UserType userType, Boolean active) {
        this.name = name;
        this.password = password;
        this.phone = phone;
        this.userType = userType;
        this.active = active;
    }

    @Override
    // 원래 해당 레벨에서 여러개의 인증 권한을 가질 수 있는 경우를 위해 collection 을 사용
    // 우선 그런 경우를 상정하지 않고 TokenService 에서 직접 해당 객체를 만들어 사용하는 것으로 대체
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.phone;
    }

    @Override
    //계정의 만료 여부 리턴
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    //계정의 잠금 여부 리턴
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    //비밀번호 만료 여부 리턴
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    //계정 활성화 여부 리턴
    public boolean isEnabled() {
        return false;
    }

}
