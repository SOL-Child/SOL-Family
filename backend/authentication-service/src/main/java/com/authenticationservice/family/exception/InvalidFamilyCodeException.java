package com.authenticationservice.family.exception;


import com.authenticationservice.global.error.ErrorCode;
import com.authenticationservice.global.error.exception.ValidationException;

public class InvalidFamilyCodeException extends ValidationException {
    public InvalidFamilyCodeException(ErrorCode errorCode) {
        super(errorCode);
    }
}
