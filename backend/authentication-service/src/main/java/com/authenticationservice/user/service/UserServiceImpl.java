package com.authenticationservice.user.service;

import com.authenticationservice.global.error.ErrorCode;
import com.authenticationservice.global.error.exception.BusinessException;
import com.authenticationservice.token.entity.Token;
import com.authenticationservice.user.exception.DuplicatePhoneException;
import com.authenticationservice.token.dto.response.CreateTokenResDto;
import com.authenticationservice.token.service.TokenService;
import com.authenticationservice.user.dto.request.LoginReqDto;
import com.authenticationservice.user.dto.request.UserReqDto;
import com.authenticationservice.user.dto.response.UserResDto;
import com.authenticationservice.user.entity.User;
import com.authenticationservice.user.repository.JpaUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service("userService")
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final PasswordEncoder passwordEncoder;
    private final JpaUserRepository jpaUserRepository;
    private final TokenService tokenService;

    @Override
    public User findById(Long userId) {
        return jpaUserRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));
    }

    @Override
    public User findByPhone(String phone) {
        return jpaUserRepository.findByPhone(phone)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));
    }

    @Override
    public Optional<User>findNewByPhone(String phone) {
        return jpaUserRepository.findByPhone(phone);
    }

    @Override
    @Transactional
    public void signUp(UserReqDto userReqDto) {
        // valid phone
        if (findNewByPhone(userReqDto.getPhone()).isPresent())
            throw new DuplicatePhoneException(ErrorCode.DUPLICATE_PHONE_EXCEPTION);

        // valid password
        if (!userReqDto.getPassword().equals(userReqDto.getPasswordCheck()))
            throw new BusinessException(ErrorCode.INVALID_PASSWORD_CHECK);

        User user = User.builder()
                .identification(String.valueOf(UUID.randomUUID()))
                .name(userReqDto.getName())
                .password(passwordEncoder.encode(userReqDto.getPassword()))
                .phone(userReqDto.getPhone())
                .userType(userReqDto.getUserType())
                .active(true)
                .build();

        jpaUserRepository.save(user);
    }

    @Override
    @Transactional
    public CreateTokenResDto signIn(LoginReqDto loginReqDto) {
        User user = findByPhone(loginReqDto.getPhone());
        if(!passwordEncoder.matches(loginReqDto.getPassword(),user.getPassword()))
            throw new BusinessException(ErrorCode.INVALID_PASSWORD_CHECK);

        return tokenService.createUserToken(user);
    }

    @Override
    public UserResDto findByIdentification(String identification) {
        Optional<User> user = jpaUserRepository.findByIdentification(identification);
        return user.map(value -> new UserResDto().of(value))
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXIST));
    }

    @Override
    @Transactional
    public void logout(User user) {
        Token token = tokenService.findByUser(user);
        tokenService.deleteToken(token);
    }
}
