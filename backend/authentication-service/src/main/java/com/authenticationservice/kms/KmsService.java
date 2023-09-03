package com.authenticationservice.global.kms;

import com.amazonaws.services.kms.AWSKMS;
import com.amazonaws.services.kms.model.DecryptRequest;
import com.amazonaws.services.kms.model.EncryptionAlgorithmSpec;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;

@Service
@RequiredArgsConstructor
public class KmsService {

    private AWSKMS kmsClient;
    private String keyId;
    private String encryptionAlgorithm;

    public String decryptData(String encryptedData) {
        try {
            DecryptRequest request = new DecryptRequest();
            request.withCiphertextBlob(ByteBuffer.wrap(Base64.decodeBase64(encryptedData)));
            request.withKeyId(keyId);
            request.withEncryptionAlgorithm(EncryptionAlgorithmSpec.valueOf(encryptionAlgorithm));
            ByteBuffer plainText = kmsClient.decrypt(request).getPlaintext();
            return new String(plainText.array());
        } catch (Exception e) {
            System.out.println("decrypt fail: " + e.getMessage());
        }
        return null;
    }
}
