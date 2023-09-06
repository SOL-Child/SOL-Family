package com.authenticationservice.user.dto.response;

import com.authenticationservice.token.dto.response.CreateTokenResDto;
import com.authenticationservice.user.entity.Auth;
import com.authenticationservice.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResDto {
    private Long id;
    private String name;
    private String phone;
    private Auth userType;
    private String accessToken;
    private String refreshToken;

    public UserResDto of(User user, CreateTokenResDto token) {
        UserResDto res = new UserResDto();

        res.id = user.getId();
        res.name = user.getName();
        res.phone = user.getPhone();
        res.userType = user.getUserType();
        res.accessToken = token.getAccessToken();
        res.refreshToken = token.getRefreshToken();

        return res;
    }
}
