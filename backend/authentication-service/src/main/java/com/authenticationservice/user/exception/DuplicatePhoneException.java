package com.authenticationservice.user.exception;

import com.authenticationservice.global.error.ErrorCode;
import com.authenticationservice.global.error.exception.BusinessException;

public class DuplicatePhoneException extends BusinessException {

    public DuplicatePhoneException(ErrorCode errorCode) {
        super(errorCode);
    }
}
