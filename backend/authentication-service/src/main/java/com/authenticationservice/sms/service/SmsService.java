package com.authenticationservice.sms.service;

import com.authenticationservice.sms.dto.request.SmsReqDto;

public interface SmsService {
    String makeSmsContent(String certificationNumber);


}
