package com.authenticationservice.sms;


import com.authenticationservice.global.dto.BaseResponseBody;
import com.authenticationservice.global.error.ErrorCode;
import com.authenticationservice.sms.dto.request.SmsReqDto;
import com.authenticationservice.sms.dto.request.SmsSendReqDto;
import com.authenticationservice.user.exception.DuplicatePhoneException;
import com.authenticationservice.sms.service.SmsService;
import com.authenticationservice.user.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1")
@Tag(name = "3. SMS API", description = "전화번호 인증 api")
public class SmsController {
    private final SmsService smsService;
    private final UserService userService;

    // 인증번호 발송
    @PostMapping("/sms/sends")
    public ResponseEntity<? extends BaseResponseBody> sendSms(@RequestBody SmsSendReqDto smsSendReqDto) {
        if(userService.findNewByPhone(smsSendReqDto.getPhone()).isPresent())
            throw new DuplicatePhoneException(ErrorCode.DUPLICATE_PHONE_EXCEPTION);
        smsService.sendSms(smsSendReqDto.getPhone());
        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0,"Success"));
    }

    // 인증번호 확인
    @PostMapping("/sms/confirms")
    public ResponseEntity<? extends BaseResponseBody> SmsVerification(@RequestBody SmsReqDto smsReqDto) {
        smsService.verifySms(smsReqDto);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0,"Success"));
    }
}