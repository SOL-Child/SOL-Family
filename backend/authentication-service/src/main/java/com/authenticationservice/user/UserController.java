package com.authenticationservice.user;

import com.authenticationservice.global.dto.BaseResponseBody;
import com.authenticationservice.global.util.SecurityUtil;
import com.authenticationservice.token.dto.response.CreateTokenResDto;
import com.authenticationservice.user.dto.request.LoginReqDto;
import com.authenticationservice.user.dto.request.UserReqDto;
import com.authenticationservice.user.dto.response.UserResDto;
import com.authenticationservice.user.entity.User;
import com.authenticationservice.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/v1")
@Tag(name = "1. User API", description = "user api")
public class UserController {

    private final UserService userService;

    @Operation(summary = "회원가입", description = "start/v1/users/signup\n\n" )
    @PostMapping("/users/signup")
    public ResponseEntity<? extends BaseResponseBody> createUser(@RequestBody UserReqDto userReqDto){
        userService.signUp(userReqDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0,"Success"));
    }

    @Operation(summary = "로그인", description = "/start/v1/users/signin\n\n" )
    @PostMapping("/users/signin")
    public ResponseEntity<? extends BaseResponseBody> signIn(@RequestBody LoginReqDto loginReqDto){
        CreateTokenResDto userInfo = userService.signIn(loginReqDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0,userInfo));
    }

    @Operation(summary = "로그아웃", description = "/auth/v1/users/logout\n\n" )
    @PostMapping("/users/logout")
    public ResponseEntity<? extends BaseResponseBody> logout(){
        String authorizedMember = SecurityUtil.getAuthorizedMember();
        User user = userService.findByPhone(authorizedMember);
        //TODO : 토큰 만료화
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0,"Success"));
    }

    @Operation(summary = "유저 정보 조회", description = "/auth/v1/users/{identification}\n\n" )
    @GetMapping("/users/{identification}")
    public ResponseEntity<? extends BaseResponseBody> userInfo(@PathVariable(name = "identification") String identification){
        UserResDto userResDto = userService.findByIdentification(identification);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, userResDto));
    }

}
