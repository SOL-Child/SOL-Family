package com.authenticationservice.family.service;

import com.authenticationservice.family.dto.request.FamilyReqDto;
import com.authenticationservice.family.entity.Family;
import com.authenticationservice.family.exception.InvalidFamilyCodeException;
import com.authenticationservice.family.repository.JpaFamilyRepository;
import com.authenticationservice.global.error.ErrorCode;
import com.authenticationservice.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service("familyService")
@Transactional
@RequiredArgsConstructor
public class FamilyServiceImpl implements FamilyService{

    private final JpaFamilyRepository jpaFamilyRepository;

    @Override
    @Transactional
    public String createFamily(User user) {

        if (user.getFamily() != null) return user.getFamily().getCode();
        String newCode = String.valueOf(UUID.randomUUID());
        Family family = Family.builder()
                .code(newCode)
                .user(user)
                .build();

        Family connectedFamily = jpaFamilyRepository.save(family);
        user.setFamily(family);
        return connectedFamily.getCode();
    }

    @Override
    public void connectFamily(FamilyReqDto familyReqDto, User user) {
        Family family = findByCode(familyReqDto.getCode());
        family.addFamily(user);
    }

    private Family findByCode(String code) {
        return jpaFamilyRepository.findByCode(code)
                .orElseThrow(() -> new InvalidFamilyCodeException(ErrorCode.INVALID_FAMILY_CODE));
    }
}
