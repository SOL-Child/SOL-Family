package com.authenticationservice.user.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginReqDto {

    private String phone;
    private String password;
}
