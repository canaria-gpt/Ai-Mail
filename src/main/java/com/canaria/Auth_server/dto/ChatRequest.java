package com.canaria.Auth_server.dto;

import com.canaria.Auth_server.domain.ChatMail;
import com.canaria.Auth_server.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    public ChatMail toEntity() {
        return ChatMail.builder()
                .loginId(this.loginId)
                .mail(this.chatMail)
                .build();
    }
}
