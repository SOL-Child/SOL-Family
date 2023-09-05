package com.authenticationservice.token.repository;

import com.authenticationservice.token.entity.Token;
import com.authenticationservice.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaTokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByUser(User user);

    Optional<Token> findByToken(String token);
}
