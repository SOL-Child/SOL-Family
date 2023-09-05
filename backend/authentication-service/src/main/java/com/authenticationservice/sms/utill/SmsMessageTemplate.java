package com.authenticationservice.sms.utill;

public class SmsMessageTemplate {
    public String builderCertificationContent(String certificationNumber) {

        StringBuilder builder = new StringBuilder();
        builder.append("[SOL-Family] 인증번호는 ");
        builder.append(certificationNumber);
        builder.append("입니다. ");

        return builder.toString();
    }
}
