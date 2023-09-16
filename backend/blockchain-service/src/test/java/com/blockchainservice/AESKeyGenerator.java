package com.blockchainservice;

import java.security.SecureRandom;

public class AESKeyGenerator {
    public static void main(String[] args) {
        System.out.println("Random Key: " + generateRandomString(32)); // 256비트 키
        System.out.println("Random IV: " + generateRandomString(16));  // 128비트 IV
    }

    public static String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            sb.append(characters.charAt(random.nextInt(characters.length())));
        }

        return sb.toString();
    }
}

