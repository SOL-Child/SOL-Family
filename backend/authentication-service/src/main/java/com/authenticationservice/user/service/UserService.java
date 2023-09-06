package com.authenticationservice.user.service;

import com.authenticationservice.user.dto.request.UserReqDto;
import com.authenticationservice.user.dto.response.UserResDto;
import com.authenticationservice.user.entity.User;


public interface UserService {

    User findById(Long userId);

    User findByPhone(String phone);

    void signUp(UserReqDto userReqDto);
}
