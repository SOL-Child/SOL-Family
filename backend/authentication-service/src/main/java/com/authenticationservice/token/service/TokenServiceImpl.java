package com.authenticationservice.token.service;

import com.authenticationservice.token.config.TokenProvider;
import com.authenticationservice.token.dto.response.CreateAccessTokenResDto;
import com.authenticationservice.token.entity.Token;
import com.authenticationservice.token.repository.JpaTokenRepository;
import com.authenticationservice.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;

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

    public Token findByRefreshToken(String refreshToken) {
        return jpaTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected token"));
    }
}
