package com.canaria.Auth_server.repository;

import com.canaria.Auth_server.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByLoginId(String loginId);
    Boolean existsByRefreshToken(String token);
    RefreshToken findByRefreshToken(String token);
}
