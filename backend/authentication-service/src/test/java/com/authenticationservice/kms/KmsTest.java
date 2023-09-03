package com.authenticationservice.kms;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.kms.AWSKMS;
import com.amazonaws.services.kms.AWSKMSClientBuilder;
import com.amazonaws.services.kms.model.DecryptRequest;
import com.amazonaws.services.kms.model.EncryptRequest;
import com.amazonaws.services.kms.model.EncryptResult;
import org.apache.commons.codec.binary.Base64;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

@ActiveProfiles("test")
public class KmsTest {
    private static final String KEY_ID = "";

    @Test
    void encrypt() {
        final String plaintext = "test";

        try {
            AWSKMS kmsClient = AWSKMSClientBuilder.standard()
                    .withRegion(Regions.AP_NORTHEAST_2)
                    .build();

            EncryptRequest request = new EncryptRequest();
            request.withKeyId(KEY_ID);
            request.withPlaintext(ByteBuffer.wrap(plaintext.getBytes(StandardCharsets.UTF_8)));

            EncryptResult result = kmsClient.encrypt(request);
            ByteBuffer ciphertextBlob = result.getCiphertextBlob();

            System.out.println("ciphertextBlob: " + new String(Base64.encodeBase64(ciphertextBlob.array())));
        } catch (Exception e) {
            System.out.println("encrypt fail: " + e.getMessage());
        }
    }

    @Test
    void decrypt() {
        final String encriptedText = "AQICAHii/q3Sq/njqcWsBdNTJeC7rTLbaofGW/NwzEMD1js2YAE6kScR32ieIarhwrBAP6DGAAAA6DCB5QYJKoZIhvcNAQcGoIHXMIHUAgEAMIHOBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDAGL5moNw47pHkrg9AIBEICBoGFxBBxeuS/77s72ZEjfHck4a0Ae0nlUpV5TQk/UlT2GQP7U9Mdn/K9t8oACL3CJrg2PNW1Jymtse7aqNdEr5ZpXzDkvB/kABm0cs+YCRk06ercIWrXcWtMVV1lb5/lJJ3fGiyWEaNZk+e5uOO8Wfp9N9bt4Q7kHdM+fV/TN3OoV2kVOQiZ52fkR16KoX0vO2ePJ25p87N0m5xTCbmFKo4g=";

        try {
            AWSKMS kmsClient = AWSKMSClientBuilder.standard()
                    .withRegion(Regions.AP_NORTHEAST_2)
                    .build();

            DecryptRequest request = new DecryptRequest();
            request.withCiphertextBlob(ByteBuffer.wrap(Base64.decodeBase64(encriptedText)));
            request.withKeyId(KEY_ID);
            ByteBuffer plainText = kmsClient.decrypt(request).getPlaintext();

            System.out.println("plainText: " + new String(plainText.array()));
        } catch (Exception e) {
            System.out.println("decrypt fail: " + e.getMessage());
        }
    }
}