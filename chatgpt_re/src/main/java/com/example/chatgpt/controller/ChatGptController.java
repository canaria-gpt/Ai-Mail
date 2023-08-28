package com.example.chatgpt.controller;

import com.example.chatgpt.dto.ChatGptResponseDto;
import com.example.chatgpt.dto.QuestionRequestDto;
import com.example.chatgpt.service.IntroChatGptService;
import com.example.chatgpt.service.KakaoChatGptService;
import com.example.chatgpt.service.MailChatGptService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat-gpt")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ChatGptController {

    private final MailChatGptService mailchatGptService;
    private final KakaoChatGptService kakaoChatGptService;
    private final IntroChatGptService introChatGptService;

    public ChatGptController(MailChatGptService mailchatGptService,
                             KakaoChatGptService kakaoChatGptService,
                             IntroChatGptService introducChatGptService) {
        this.mailchatGptService = mailchatGptService;
        this.kakaoChatGptService = kakaoChatGptService;
        this.introChatGptService = introducChatGptService;
    }

    @PostMapping("/mail")
    public ChatGptResponseDto sendQuestion1(@RequestBody QuestionRequestDto requestDto) {
        return mailchatGptService.askQuestion(requestDto);
    }

    @PostMapping("/kakao")
    public ChatGptResponseDto sendQuestion2(@RequestBody QuestionRequestDto requestDto) {
        return kakaoChatGptService.askQuestion(requestDto);
    }

    @PostMapping("/intro")
    public ChatGptResponseDto sendQuestion3(@RequestBody QuestionRequestDto requestDto) {
        return introChatGptService.askQuestion(requestDto);
    }
}