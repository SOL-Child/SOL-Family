package com.authenticationservice.user.entity;

import lombok.Getter;

@Getter
public enum UserType {
    PARENT("PARENT"),
    CHILD("CHILD"),
    ADMIN("ADMIN");

    private String role;
    UserType(String role) {
        this.role = role;
    }
}
