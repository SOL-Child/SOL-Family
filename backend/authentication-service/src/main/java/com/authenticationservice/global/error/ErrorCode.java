package com.authenticationservice.global.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // 회원
    USER_NOT_EXIST(HttpStatus.BAD_REQUEST, "U-001", "회원이 존재하지 않습니다."),
    INVALID_PASSWORD_CHECK(HttpStatus.BAD_REQUEST, "U-002", "비밀번호가 일치하지 않습니다."),

    // 토큰
    UNEXPECTED_TOKEN(HttpStatus.BAD_REQUEST, "T-001", "만료되었거나 존재하지 않는 토큰입니다."),

    ;


    ErrorCode(HttpStatus httpStatus, String errorCode, String message) {
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.message = message;
    }

    private HttpStatus httpStatus;
    private String errorCode;
    private String message;
}
