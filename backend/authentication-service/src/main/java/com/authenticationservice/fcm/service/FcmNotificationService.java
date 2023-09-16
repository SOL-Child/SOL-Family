package com.authenticationservice.fcm.service;

import com.authenticationservice.fcm.dto.FcmNotificationRequestDto;
public interface FcmNotificationService {

    public String sendNotificationByToken(FcmNotificationRequestDto requestDto);
}