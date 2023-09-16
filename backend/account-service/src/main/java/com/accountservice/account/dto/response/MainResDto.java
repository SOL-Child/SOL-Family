package com.accountservice.account.dto.response;

import com.accountservice.account.entity.Account;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MainResDto {
    private String name;
    private String userType;
    private boolean family;
    private String familyCode;
    private String familyCnt;
    private boolean book;
    private Account bankbook;

    public MainResDto of (String name, String userType, boolean family, String familyCode, String familyCnt, boolean book, Account bankbook) {
        MainResDto res = new MainResDto();
        res.name = name;
        res.userType = userType;
        res.family = family;
        res.familyCode = familyCode;
        res.familyCnt = familyCnt;
        res.book = book;
        res.bankbook = bankbook;
        return res;
    }
}
