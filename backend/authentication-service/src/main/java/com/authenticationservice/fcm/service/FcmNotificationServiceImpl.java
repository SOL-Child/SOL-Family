package com.authenticationservice.fcm.service;

import com.authenticationservice.family.entity.Family;
import com.authenticationservice.family.repository.JpaFamilyRepository;
import com.authenticationservice.fcm.dto.FcmNotificationRequestDto;
import com.authenticationservice.user.entity.User;
import com.authenticationservice.user.entity.UserType;
import com.authenticationservice.user.repository.JpaUserRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FcmNotificationServiceImpl {

    private final FirebaseMessaging firebaseMessaging;
    private final JpaUserRepository jpaUserRepository;
    private final JpaFamilyRepository jpaFamilyRepository;

    public String sendNotificationByToken(FcmNotificationRequestDto requestDto) {

        Optional<User> user = jpaUserRepository.findByIdentification(requestDto.getTargetUser());

        if (user.isPresent()) {
            Optional<Family> family = jpaFamilyRepository.findByCode(user.get().getFamily().getCode());
            if (family.isPresent()) {
                List<User> users = family.get().getConnectedFamily();
                for (User u : users) {
                    if (u.getUserType().equals(UserType.PARENT)) {
                        if (u.getFcmToken() != null) {
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
                            } catch (FirebaseMessagingException e) {
                                e.printStackTrace();
                                return "대출 신청 취소😢";
                            }

                        }

                        else {
                            return "Firebase Token 식별 불가";
                        }
                    }
                }

                return "대출 신청 완료😊";
            }

            else {
                return "가족 식별 불가";
            }
        }
        else
            return "유저 식별 불가";
    }
}