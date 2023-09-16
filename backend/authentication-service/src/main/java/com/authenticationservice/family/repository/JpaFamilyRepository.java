package com.authenticationservice.family.repository;

import com.authenticationservice.family.entity.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaFamilyRepository extends JpaRepository<Family, Long> {
    Optional<Family> findByCode(String code);
}
