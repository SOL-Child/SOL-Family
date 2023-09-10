package com.authenticationservice.kms;

import com.amazonaws.services.kms.AWSKMS;
import com.amazonaws.services.kms.model.DecryptRequest;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;

@Service
public class KmsService {

   private final AWSKMS kmsClient;
   private final String keyId;

   @Autowired
   public KmsService(AWSKMS kmsClient, @Qualifier("keyId") String keyId) {
       this.kmsClient = kmsClient;
       this.keyId = keyId;
   }

   public String decryptData(String encryptedData) {
       try {
           DecryptRequest request = new DecryptRequest();
           request.withCiphertextBlob(ByteBuffer.wrap(Base64.decodeBase64(encryptedData)));
           request.withKeyId("df62094c-5a57-4fb1-815b-ae7d7750895f");
           ByteBuffer plainText = kmsClient.decrypt(request).getPlaintext();
           return new String(plainText.array());
       } catch (Exception e) {
           System.out.println("decrypt fail: " + e.getMessage());
       }
       return null;
   }
}
