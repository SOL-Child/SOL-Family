package com.blockchainservice.global.error.exception;


import com.blockchainservice.global.error.ErrorCode;

public class ValidationException extends BusinessException{
    public ValidationException(ErrorCode errorCode) {
        super(errorCode);
    }
}
