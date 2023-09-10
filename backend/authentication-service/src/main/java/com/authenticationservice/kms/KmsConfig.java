package com.authenticationservice.kms;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.kms.AWSKMS;
import com.amazonaws.services.kms.AWSKMSClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KmsConfig {

//   @Value("${aws.kms.key-id}")
//   private String KEY_ID;
//
//   @Value("${aws.kms.region}")
//   private String REGION;


   @Bean
   public AWSKMS kmsClient() {
       return AWSKMSClientBuilder.standard()
               .withRegion(Regions.AP_NORTHEAST_2)
               .build();
   }

   @Bean
   public String keyId() {
       return "df62094c-5a57-4fb1-815b-ae7d7750895f";
   }

}

