package com.blockchainservice.ethereum.service;



import java.security.MessageDigest;
import java.security.SecureRandom;


public class Encrypt {
    private static final int SALT_SIZE = 16;

    protected String hashing(byte[] password, String Salt) throws Exception {

        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");

        // key-stretching
        for(int i = 0; i < 10000; i++) {
            String temp = byteToString(password) + Salt;
            messageDigest.update(temp.getBytes());
            password = messageDigest.digest();							// messageDigest 객체의 다이제스트를 얻어 password 를 갱신
        }
        return byteToString(password);
    }


    // SALT 생성
    protected String getSALT()  {
        SecureRandom rnd = new SecureRandom();
        byte[] temp = new byte[SALT_SIZE];
        rnd.nextBytes(temp);

        return byteToString(temp);

    }


    // 바이트 값을 16진수로 변경
    protected String byteToString(byte[] temp) {
        StringBuilder sb = new StringBuilder();
        for(byte a : temp) {
            sb.append(String.format("%02x", a));
        }
        return sb.toString();
    }


}

