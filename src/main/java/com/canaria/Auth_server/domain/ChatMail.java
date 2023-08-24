package com.canaria.Auth_server.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@NoArgsConstructor
public class ChatMail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String mail;
    @NotBlank
    private String loginId;

    public ChatMail(Long id, String mail, String loginId) {
        this.id = id;
        this.mail = mail;
        this.loginId = loginId;
    }
}
