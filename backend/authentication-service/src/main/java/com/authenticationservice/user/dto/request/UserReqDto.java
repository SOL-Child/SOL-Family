package com.authenticationservice.user.dto.request;

import com.authenticationservice.user.entity.Auth;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserReqDto {
    private String name;
    private String password;
    private String passwordCheck;
    private String phone;
    private Auth userType;
}
