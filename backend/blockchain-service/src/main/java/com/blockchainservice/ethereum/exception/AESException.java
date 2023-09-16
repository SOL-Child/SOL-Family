package com.blockchainservice.ethereum.exception;

import com.blockchainservice.global.error.ErrorCode;
import com.blockchainservice.global.error.exception.BusinessException;

public class AESException extends BusinessException {

    public AESException(ErrorCode errorCode) {
        super(errorCode);
    }
}
