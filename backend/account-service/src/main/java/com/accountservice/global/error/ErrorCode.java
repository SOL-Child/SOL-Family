package com.accountservice.global.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // 계좌
    INVALID_TRANSFER_CODE(HttpStatus.BAD_REQUEST, "B-001", "이체 코드가 올바르지 않습니다."),
    TIMEOUT_TRANSFER_CODE(HttpStatus.BAD_REQUEST, "B-002", "이체 확인 시간이 만료되었습니다."),
    TRANSFER_CODE_NOT_EXIST(HttpStatus.BAD_REQUEST, "B-003", "해당 user의 이체 코드가 존재하지 않습니다."),
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
