package com.authenticationservice.user.service;

import com.authenticationservice.token.dto.response.CreateTokenResDto;
import com.authenticationservice.user.dto.request.LoginReqDto;
import com.authenticationservice.user.dto.request.UserReqDto;
import com.authenticationservice.user.dto.response.UserResDto;
import com.authenticationservice.user.entity.User;

import java.util.Optional;


public interface UserService {

    User findById(Long userId);

    User findByPhone(String phone);

    Optional<User> findNewByPhone(String phone);

    void signUp(UserReqDto userReqDto);

    CreateTokenResDto signIn(LoginReqDto loginReqDto);

    UserResDto findByIdentification(String identification);
}
