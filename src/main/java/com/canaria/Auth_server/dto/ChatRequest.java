package com.canaria.Auth_server.dto;

import com.canaria.Auth_server.domain.ChatMail;
import com.canaria.Auth_server.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.Authentication;

@Getter
@Setter
@NoArgsConstructor
public class ChatRequest {
    private String chatMail;
    private String loginId;

    public ChatRequest(String chatMail) {
        this.chatMail = chatMail;
    }

    public ChatRequest(String chatMail, String loginId) {
        this.chatMail = chatMail;
        this.loginId = loginId;
    }

    public ChatMail toEntity(Authentication auth) {
        return ChatMail.builder()
                .loginId(auth.getName())
                .mail(this.chatMail)
                .build();
    }
}
