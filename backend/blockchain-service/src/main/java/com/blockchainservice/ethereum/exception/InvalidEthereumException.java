package com.blockchainservice.ethereum.exception;

import com.blockchainservice.global.error.ErrorCode;
import com.blockchainservice.global.error.exception.BusinessException;

public class InvalidEthereumException extends BusinessException {
    public InvalidEthereumException(ErrorCode errorCode) {
        super(errorCode);
    }
}
