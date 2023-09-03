package com.authenticationservice.global.kms;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.kms.AWSKMS;
import com.amazonaws.services.kms.AWSKMSClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KmsConfig {

    @Value("${aws.kms.key-id}")
    private String KEY_ID;

    @Value("${aws.kms.region}")
    private String REGION;

    @Value("${aws.kms.encryption-algorithm}")
    private String ENCRYPTION_ALGORITHM;

    @Bean
    public AWSKMS kmsClient() {
        return AWSKMSClientBuilder.standard()
                .withRegion(Regions.fromName(REGION))
                .build();
    }

    @Bean
    public String keyId() {
        return KEY_ID;
    }

    @Bean
    public String encryptionAlgorithm() {
        return ENCRYPTION_ALGORITHM;
    }
}

