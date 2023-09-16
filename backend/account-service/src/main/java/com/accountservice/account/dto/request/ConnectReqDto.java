package com.accountservice.account.dto.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConnectReqDto {
    private String account;
    private String memo;
}
