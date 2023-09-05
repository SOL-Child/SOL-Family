package com.authenticationservice.user.entity;

import lombok.Getter;

@Getter
public enum Auth {
    PARENT("PARENT"),
    CHILD("CHILD"),
    ADMIN("ADMIN");

    private String role;
    Auth(String role) {
        this.role = role;
    }
}
