package com.authenticationservice.global.kms;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.kms.AWSKMS;
import com.amazonaws.services.kms.AWSKMSClientBuilder;
import com.amazonaws.services.kms.model.DecryptRequest;
import com.amazonaws.services.kms.model.EncryptionAlgorithmSpec;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;

import java.nio.ByteBuffer;

public class KmsService {

    @Value("${aws.kms.key-id}")
    private String KEY_ID;

    @Value("${aws.kms.region}")
    private String REGION;

    @Value("${aws.kms.encryption-algorithm}")
    private String ENCRYPTION_ALGORITHM;

    public String decryptData(String encryptedData) {
        try {
            AWSKMS kmsClient = AWSKMSClientBuilder.standard()
                    .withRegion(Regions.fromName(REGION))
                    .build();

            DecryptRequest request = new DecryptRequest();
            request.withCiphertextBlob(ByteBuffer.wrap(Base64.decodeBase64(encryptedData)));
            request.withKeyId(KEY_ID);
            request.withEncryptionAlgorithm(EncryptionAlgorithmSpec.valueOf(ENCRYPTION_ALGORITHM));
            ByteBuffer plainText = kmsClient.decrypt(request).getPlaintext();
            return new String(plainText.array());
        } catch (Exception e) {
            System.out.println("decrypt fail: " + e.getMessage());
        }
        return null;
    }
}

