package com.authenticationservice.user;

import com.authenticationservice.global.dto.BaseResponseBody;
import com.authenticationservice.user.dto.request.UserReqDto;
import com.authenticationservice.user.dto.response.UserResDto;
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
@Tag(name = "1. User API", description = "user api")
public class UserController {

    private final UserService userService;

    @Operation(summary = "회원가입", description = "\n\n" )
    @PostMapping("/users/signup")
    public ResponseEntity<? extends BaseResponseBody> createUser(@RequestBody UserReqDto userReqDto){
        userService.signUp(userReqDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0,"Success"));
    }
}