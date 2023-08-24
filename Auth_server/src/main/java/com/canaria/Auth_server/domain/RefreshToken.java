package com.canaria.Auth_server.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String refreshToken;
    @NotBlank
    private String loginId;

    public RefreshToken(String refreshToken, String loginId) {
        this.refreshToken = refreshToken;
        this.loginId = loginId;
    }

    public RefreshToken updateToken(String token){
        this.refreshToken = token;
        return this;
    }
}
