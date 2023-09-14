//package com.authenticationservice.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class Webconfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/v1/**") // 어떤 api 경로에 매핑할지
//                .allowedOrigins(
//                        "http://localhost:3000",
//                        "http://localhost:8080",
//                        "http://solfamily-shinhan.com",
//                        "https://solfamily-shinhan.com",
//                        "http://3.35.49.187:8000",
//                        "http://ec2-3-35-49-187.ap-northeast-2.compute.amazonaws.com:8000"
//                )
//                .allowedMethods(
//                        HttpMethod.GET.name(),
//                        HttpMethod.POST.name(),
//                        HttpMethod.PUT.name(),
//                        HttpMethod.PATCH.name(),
//                        HttpMethod.DELETE.name(),
//                        HttpMethod.OPTIONS.name()
//                )
//                .allowCredentials(true)
//                .maxAge(3600); // preflight
//    }
//}
