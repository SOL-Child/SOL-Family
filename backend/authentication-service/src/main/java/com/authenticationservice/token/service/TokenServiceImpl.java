package com.authenticationservice.token.service;

import com.authenticationservice.global.error.ErrorCode;
import com.authenticationservice.global.error.exception.AuthenticationException;
import com.authenticationservice.token.config.TokenProvider;
import com.authenticationservice.token.dto.response.CreateAccessTokenResDto;
import com.authenticationservice.token.dto.response.CreateTokenResDto;
import com.authenticationservice.token.entity.Token;
import com.authenticationservice.token.repository.JpaTokenRepository;
import com.authenticationservice.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

@Service("tokenService")
@Transactional
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService{
    private final JpaTokenRepository jpaTokenRepository;
    private final TokenProvider tokenProvider;

    @Override
    @Transactional
    public void saveToken(User user, String token) {
        Token newToken = Token.builder()
                .user(user)
                .token(token)
                .build();

        jpaTokenRepository.save(newToken);
    }

    @Override
    public CreateTokenResDto createUserToken(User user){
        // accessToken
        String accessToken = tokenProvider.generateToken(user,  Duration.ofHours(1));
        //  refreshToken
        String refreshToken = tokenProvider.generateToken(user,  Duration.ofDays(14));

        Optional<Token> token = jpaTokenRepository.findByUser(user);

        if (token.isPresent()) token.get().setToken(refreshToken);
        else saveToken(user, refreshToken);

        return new CreateTokenResDto().of(accessToken, refreshToken);
    }

    @Override
    public CreateAccessTokenResDto createNewAccessToken(User user, String refreshToken) {
        if(!tokenProvider.validToken(refreshToken)) {
            throw new AuthenticationException(ErrorCode.UNEXPECTED_TOKEN);
        }
        String token =  tokenProvider.generateToken(user, Duration.ofHours(2));
        return new CreateAccessTokenResDto(token);
    }

    public Token findByRefreshToken(String refreshToken) {
        return jpaTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new AuthenticationException(ErrorCode.UNEXPECTED_TOKEN));
    }

    @Override
    public Token findByUser(User user) {
        return jpaTokenRepository.findByUser(user)
                .orElseThrow(() -> new AuthenticationException(ErrorCode.UNEXPECTED_TOKEN));
    }

    @Override
    public void deleteToken(Token token) {
        jpaTokenRepository.delete(token);
    }
}
