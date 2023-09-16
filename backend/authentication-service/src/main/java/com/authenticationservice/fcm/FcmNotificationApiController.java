package com.authenticationservice.fcm;

import com.authenticationservice.fcm.dto.FcmNotificationRequestDto;
import com.authenticationservice.fcm.service.FcmNotificationServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1")
public class FcmNotificationApiController {

    private final FcmNotificationServiceImpl fcmNotificationService;

    @PostMapping("/notification")
    public String sendNotificationByToken(@RequestBody FcmNotificationRequestDto requestDto) {
        return fcmNotificationService.sendNotificationByToken(requestDto);
    }
}