package com.authenticationservice.token.service;

import com.authenticationservice.token.dto.response.CreateAccessTokenResDto;
import com.authenticationservice.token.dto.response.CreateTokenResDto;
import com.authenticationservice.user.entity.User;

public interface TokenService {
    void saveToken(User user, String token);
    CreateTokenResDto createUserToken(User user);

}

