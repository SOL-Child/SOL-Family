package com.authenticationservice.fcm.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FcmNotificationRequestDto {

    // 전송 대상 식별 코드
    private String targetUser;
    
    // 제목
    private String title;
    
    // 내용
    private String content;

    @Builder
    public FcmNotificationRequestDto(String targetUser, String title, String content) {
        this.targetUser = targetUser;
        this.title = title;
        this.content = content;
    }
}