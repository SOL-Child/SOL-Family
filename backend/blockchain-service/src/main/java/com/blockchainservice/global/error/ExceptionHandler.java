package com.blockchainservice.global.error;

import com.blockchainservice.global.dto.BaseResponseBody;
import com.blockchainservice.global.error.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.net.BindException;

@Slf4j
@RestControllerAdvice
public class ExceptionHandler {

    // javax.validation.Valid 또는 @Validated binding error가 발생할 경우
    @org.springframework.web.bind.annotation.ExceptionHandler(BindException.class)
    protected ResponseEntity<? extends BaseResponseBody> handleBindException(BindException e) {
        log.error("handleBindException", e);
        BaseResponseBody errorResponse = BaseResponseBody.error(HttpStatus.BAD_REQUEST.toString(), e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(errorResponse);
    }

    // 주로 @RequestParam enum으로 binding 못했을 경우 발생
    @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentTypeMismatchException.class)
    protected ResponseEntity<? extends BaseResponseBody> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        log.error("handleMethodArgumentTypeMismatchException", e);
        BaseResponseBody errorResponse = BaseResponseBody.error(HttpStatus.BAD_REQUEST.toString(), e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(errorResponse);
    }

    // 주로 @Valid를 통과하지 못했을 경우 발생
    @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<? extends BaseResponseBody> methodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error("methodArgumentNotValidException", e);
        BaseResponseBody errorResponse = BaseResponseBody.error(HttpStatus.BAD_REQUEST.toString(), e.getFieldError().getDefaultMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(errorResponse);
    }

    // 지원하지 않은 HTTP method 호출 할 경우 발생
    @org.springframework.web.bind.annotation.ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    protected ResponseEntity<? extends BaseResponseBody> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        log.error("handleHttpRequestMethodNotSupportedException", e);
        BaseResponseBody errorResponse = BaseResponseBody.error(HttpStatus.METHOD_NOT_ALLOWED.toString(), e.getMessage());
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
                .body(errorResponse);
    }

    // 비즈니스 로직 실행 중 오류 발생
    @org.springframework.web.bind.annotation.ExceptionHandler(BusinessException.class)
    protected ResponseEntity<? extends BaseResponseBody> handleConflict(BusinessException e) {
        log.error("BusinessException", e);
        BaseResponseBody errorResponse = BaseResponseBody.error(e.getErrorCode().getErrorCode(), e.getMessage());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
                .body(errorResponse);

    }

    // 나머지 예외 발생
    @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
    protected ResponseEntity<? extends BaseResponseBody> handleException(Exception e) {
        log.error("Exception", e);
        BaseResponseBody errorResponse = BaseResponseBody.error(HttpStatus.INTERNAL_SERVER_ERROR.toString(), e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}
