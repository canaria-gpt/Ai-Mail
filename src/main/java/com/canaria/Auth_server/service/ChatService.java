package com.canaria.Auth_server.service;

import com.canaria.Auth_server.domain.ChatMail;
import com.canaria.Auth_server.dto.ChatRequest;
import com.canaria.Auth_server.repository.ChatMailRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final ChatMailRepository chatMailRepository;

    public void saveChat(Authentication authentication, ChatRequest chatRequest) {
        chatMailRepository.save(chatRequest.toEntity(authentication));
    }

    public List<ChatRequest> showChat(String loginId) {
        List<ChatMail> mails = chatMailRepository.findAllByLoginId(loginId);
        List<ChatRequest> Allmails = new ArrayList<>();
        for (ChatMail mail : mails) {
            ChatRequest chatRequest = responsedto(mail);
            Allmails.add(chatRequest);
        }
        return Allmails;
    }

    private ChatRequest responsedto (ChatMail chatMail){
        return new ChatRequest(
                chatMail.getMail(),
                chatMail.getLoginId()
        );
    }
}
