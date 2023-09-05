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

    // coolSms API를 이용하여 인증번호 발송하고, 발송 정보를 Redis에 저장
    @Override
    public void sendSms(String phone) {
        System.out.println(phone);
        Message message = new Message();
        String randomNumber = makeRandomNumber();
        String content = makeSmsContent(randomNumber);
        System.out.println(content);

        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom(smsProperties.getCoolSmsFromPhoneNumber());
        message.setTo(phone);
        message.setText(content);
        try {
            SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
            System.out.println(response);
        } catch (Exception e) {

        }

        smsCertificationDao.createSmsCertification(phone, randomNumber);
    }


}
