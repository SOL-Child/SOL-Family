package com.blockchainservice.global.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // 암호화
    ENCRYPT_ERROR(HttpStatus.BAD_REQUEST, "A-001", "암호화 에러"),
    DECRYPT_ERROR(HttpStatus.BAD_REQUEST, "A-002", "복호화 에러"),
    ETHEREUM_NOT_EXIST(HttpStatus.BAD_REQUEST, "A-003" , "계좌가 존재하지 않습니다." ),

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
