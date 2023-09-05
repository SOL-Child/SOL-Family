package com.authenticationservice.sms.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SmsReqDto {

    private String phone;
    private String certificationNumber;

    @Builder
    public SmsReqDto(String phone, String certificationNumber) {
        this.phone = phone;
        this.certificationNumber = certificationNumber;
    }
}
