package com.authenticationservice.family.exception;

import com.authenticationservice.global.error.ErrorCode;
import com.authenticationservice.global.error.exception.BusinessException;

public class DuplicateFamilyCodeException extends BusinessException {

    public DuplicateFamilyCodeException(ErrorCode errorCode) {
        super(errorCode);
    }
}
