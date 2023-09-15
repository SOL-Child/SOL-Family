package com.authenticationservice.family.service;

import com.authenticationservice.family.dto.request.FamilyReqDto;
import com.authenticationservice.user.entity.User;

public interface FamilyService {

    String createFamily(User user);
}
