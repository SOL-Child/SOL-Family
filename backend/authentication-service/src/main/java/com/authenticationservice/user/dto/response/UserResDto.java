package com.authenticationservice.user.dto.response;

import com.authenticationservice.user.entity.UserType;
import com.authenticationservice.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResDto {
    private String identification;
    private String name;
    private String phone;
    private UserType userType;
    private String familyCode;


    public UserResDto of(User user ) {
        UserResDto res = new UserResDto();
        res.identification = user.getIdentification();
        res.name = user.getName();
        res.phone = user.getPhone();
        res.userType = user.getUserType();
        res.familyCode = user.getFamily().getCode();
        return res;
    }
}
