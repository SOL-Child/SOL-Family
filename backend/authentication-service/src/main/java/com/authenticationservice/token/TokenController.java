package com.authenticationservice.token;

import com.authenticationservice.global.dto.BaseResponseBody;
import com.authenticationservice.token.dto.request.CreateAccessTokenReqDto;
import com.authenticationservice.token.dto.response.CreateAccessTokenResDto;
import com.authenticationservice.token.service.TokenService;
import com.authenticationservice.global.util.SecurityUtil;
import com.authenticationservice.user.entity.User;
import com.authenticationservice.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1")
@Tag(name = "2. Token API", description = "token api")
public class TokenController {
    private final TokenService tokenService;
    private final UserService userService;

    @Operation(summary = "Access 토큰 재발급", description = "/auth/v1/token \n\n Refresh Token을 통해 Access Token 재발급\n\n" )
    @PostMapping("/token")
    public ResponseEntity<? extends BaseResponseBody> createNewAccessToken(@RequestBody CreateAccessTokenReqDto refreshToken) {
        String authorizedMember = SecurityUtil.getAuthorizedMember();
        User user = userService.findByPhone(authorizedMember);
        CreateAccessTokenResDto newAccessToken = tokenService.createNewAccessToken(user, refreshToken.getRefreshToken());

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0, newAccessToken));
    }

}