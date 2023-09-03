package com.accountservice.config;

import com.accountservice.kms.KmsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    private final KmsService kmsService;
    private final String url;
    private final String username;
    private final String password;
    private final String driver_class_name;

    public DataSourceConfig(KmsService kmsService,
                            @Value("${spring.datasource.url}") String url,
                            @Value("${spring.datasource.username}") String username,
                            @Value("${spring.datasource.password}") String password,
                            @Value("${spring.datasource.driver-class-name}") String driver_class_name) {
        this.kmsService = kmsService;
        this.url = url;
        this.username = username;
        this.password = password;
        this.driver_class_name = driver_class_name;
    }

    @Bean
    public DataSource dataSource() {
        if (url == null || username == null || password == null) {
            throw new IllegalArgumentException("url, username, password 중 null이 존재");
        }

        String decryptedDatabaseUrl;
        String decryptedDatabaseUsername;
        String decryptedDatabasePassword;
        try {
            decryptedDatabaseUrl = kmsService.decryptData(url);
            decryptedDatabaseUsername = kmsService.decryptData(username);
            decryptedDatabasePassword = kmsService.decryptData(password);
        } catch (Exception e) {
            throw new RuntimeException("KMS를 사용하여 데이터베이스 자격 증명 해독 불가", e);
        }

        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create()
                .url(decryptedDatabaseUrl)
                .username(decryptedDatabaseUsername)
                .password(decryptedDatabasePassword)
                .driverClassName(driver_class_name);

        return dataSourceBuilder.build();
    }
}