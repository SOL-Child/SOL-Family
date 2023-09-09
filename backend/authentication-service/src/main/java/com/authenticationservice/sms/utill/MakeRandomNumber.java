package com.authenticationservice.sms.utill;

import java.util.Random;

public class MakeRandomNumber {
    public static final String makeRandomNumber() {
        Random random = new Random();
        return String.valueOf(100000 + random.nextInt(900000));
    }
}
