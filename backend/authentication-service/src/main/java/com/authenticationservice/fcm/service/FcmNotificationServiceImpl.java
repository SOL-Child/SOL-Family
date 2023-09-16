package com.authenticationservice.fcm.service;

import com.authenticationservice.fcm.dto.FcmNotificationRequestDto;
import com.authenticationservice.user.entity.User;
import com.authenticationservice.user.repository.JpaUserRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FcmNotificationServiceImpl {

    private final FirebaseMessaging firebaseMessaging;
    private final JpaUserRepository jpaUserRepository;

    public String sendNotificationByToken(FcmNotificationRequestDto requestDto) {

        Optional<User> user = jpaUserRepository.findByIdentification(requestDto.getTargetUser());

        if (user.isPresent()) {
            if (user.get().getFcmToken() != null) {
                Notification notification = Notification.builder()
                        .setTitle(requestDto.getTitle())
                        .setBody(requestDto.getContent())
                        // .setImage(requestDto.getImage())
                        .build();

                Message message = Message.builder()
                        .setToken(user.get().getFcmToken())
                        .setNotification(notification)
                        // .putAllData(requestDto.getData())
                        .build();

                try {
                    firebaseMessaging.send(message);
                    return "대출 신청 완료😊, 대출 은행 =" + requestDto.getTargetUser();
                } catch (FirebaseMessagingException e) {
                    e.printStackTrace();
                    return "대출 신청 취소😢, 대출 은행 =" + requestDto.getTargetUser();
                }

            }
            else {
                return "Firebase Token 식별 불가, 대출 은행 =" + requestDto.getTargetUser();
            }
        }
        else {
            return "유저 식별 불가, 대출 은행 =" + requestDto.getTargetUser();
        }
    }
}