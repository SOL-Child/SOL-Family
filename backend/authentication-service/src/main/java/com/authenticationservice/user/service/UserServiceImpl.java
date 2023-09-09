package com.authenticationservice.user.service;

import com.authenticationservice.token.dto.response.CreateTokenResDto;
import com.authenticationservice.token.service.TokenService;
import com.authenticationservice.user.dto.request.LoginReqDto;
import com.authenticationservice.user.dto.request.UserReqDto;
import com.authenticationservice.user.dto.response.UserResDto;
import com.authenticationservice.user.entity.User;
import com.authenticationservice.user.repository.JpaUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("userService")
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final PasswordEncoder passwordEncoder;
    private final JpaUserRepository jpaUserRepository;
    private final TokenService tokenService;

    @Override
    public User findById(Long userId) {
//        return jpaUserRepository.findById(userId)
//                .orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_EXIST));
        return null;
    }

    @Override
    public User findByPhone(String phone) {
        return jpaUserRepository.findByPhone(phone)
                .orElseThrow(() -> new IllegalArgumentException("e"));
    }

    @Override
    @Transactional
    public void signUp(UserReqDto userReqDto) {
        // valid password
        if (!userReqDto.getPassword().equals(userReqDto.getPasswordCheck())) return;

        User user = User.builder()
                .name(userReqDto.getName())
                .password(passwordEncoder.encode(userReqDto.getPassword()))
                .phone(userReqDto.getPhone())
                .userType(userReqDto.getUserType())
                .active(true)
                .build();

        jpaUserRepository.save(user);
    }

    @Override
    public UserResDto signIn(LoginReqDto loginReqDto) {
        User user = findByPhone(loginReqDto.getPhone());
        if(!passwordEncoder.matches(loginReqDto.getPassword(),user.getPassword()))
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");

        CreateTokenResDto token = tokenService.createUserToken(user);

        return new UserResDto().of(user, token);
    }
}
