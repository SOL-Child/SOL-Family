package com.accountservice.account.entity;

import lombok.Getter;

@Getter
public enum BookType {
    DEPOSIT("DEPOSIT"),
    SAVING("SAVING");

    private String type;
    BookType(String type) {
        this.type = type;
    }
}
