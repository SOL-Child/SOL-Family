package com.accountservice.account.exception;

import com.accountservice.global.error.ErrorCode;
import com.accountservice.global.error.exception.BusinessException;

public class TransferCodeException extends BusinessException {
    public TransferCodeException(ErrorCode errorCode) {
        super(errorCode);
    }
}
