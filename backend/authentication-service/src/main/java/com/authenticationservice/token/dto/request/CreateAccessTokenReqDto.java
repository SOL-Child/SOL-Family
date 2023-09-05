package com.authenticationservice.token.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccessTokenReqDto {
    private String refreshToken;
}