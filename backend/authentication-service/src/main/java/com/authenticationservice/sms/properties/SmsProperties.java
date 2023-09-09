package com.authenticationservice.sms.properties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties("external-certification")
public class SmsProperties {

    private final String emailFromAddress;
    private final String coolSmsKey;
    private final String coolSmsSecret;
    private final String coolSmsFromPhoneNumber;
}
