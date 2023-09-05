package com.authenticationservice.sms.service;


import com.authenticationservice.sms.dao.SmsDao;
import com.authenticationservice.sms.dto.request.SmsReqDto;
import com.authenticationservice.sms.properties.SmsProperties;
import com.authenticationservice.sms.utill.SmsMessageTemplate;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.nurigo.sdk.message.model.Message;


import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import static com.authenticationservice.sms.utill.MakeRandomNumber.makeRandomNumber;

@Service("smsService")
@Transactional
@RequiredArgsConstructor
public class SmsServiceImpl implements SmsService {
    private final SmsDao smsCertificationDao;
    private final SmsProperties smsProperties;
    private final DefaultMessageService messageService;

    @Autowired
    public SmsServiceImpl(SmsDao smsCertificationDao, SmsProperties smsProperties) {
        this.smsCertificationDao = smsCertificationDao;
        this.smsProperties = smsProperties;
        this.messageService = NurigoApp.INSTANCE.initialize(
                smsProperties.getCoolSmsKey(),
                smsProperties.getCoolSmsSecret(),
                "https://api.coolsms.co.kr"
        );
    }

    // 인증 메세지 내용 생성

    @Override
    public String makeSmsContent(String certificationNumber) {
        SmsMessageTemplate content = new SmsMessageTemplate();
        return content.builderCertificationContent(certificationNumber);
    }



}
