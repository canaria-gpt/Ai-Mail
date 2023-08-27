package com.example.chatgpt.service;

import com.example.chatgpt.config.ChatGptConfig;
import com.example.chatgpt.dto.ChatGptRequestDto;
import com.example.chatgpt.dto.ChatGptResponseDto;
import com.example.chatgpt.dto.QuestionRequestDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoChatGptService {
    private static final String kakao_content = "당신은 세계 최고의 문장 교정 전문가입니다. 다음은 호감있는 상대에게 보내는 카카오톡 내용입니다. 해당 카카오톡 내용을 아래 단계에 따라 교정해주시기 바랍니다." +
            "1. 오타나 비문 없이 작성합니다." +
            "2. 서로에게 호감이 느껴지도록 메시지를 작성합니다." +
            "3. 핵심 메시지는 왜곡이나 누락없이 전달합니다." +
            "4. 추가적인 표현을 전달하지 않습니다." +
            "5. 위의 사항을 고려하여 카카오톡 내용을 수정합니다." +
            "카카오톡의 내용은 다음과 같습니다." +
            "---" +
            "내용: %s" +
            "---";


    private static RestTemplate restTemplate = new RestTemplate();

    public HttpEntity<ChatGptRequestDto> buildHttpEntity(ChatGptRequestDto requestDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(ChatGptConfig.MEDIA_TYPE));
        headers.add(ChatGptConfig.AUTHORIZATION, ChatGptConfig.BEARER + ChatGptConfig.API_KEY);
        return new HttpEntity<>(requestDto, headers);
    }

    public ChatGptResponseDto getResponse(HttpEntity<ChatGptRequestDto> chatGptRequestDtoHttpEntity) {
        ResponseEntity<ChatGptResponseDto> responseEntity = restTemplate.postForEntity(
                ChatGptConfig.URL,
                chatGptRequestDtoHttpEntity,
                ChatGptResponseDto.class);

        return responseEntity.getBody();
    }


    public ChatGptResponseDto askQuestion(QuestionRequestDto requestDto) {
        String chatMessage = String.format(kakao_content, requestDto.getQuestion());
        return this.getResponse(
                this.buildHttpEntity(
                        new ChatGptRequestDto(
                                ChatGptConfig.MODEL,
                                chatMessage,
                                ChatGptConfig.MAX_TOKEN,
                                ChatGptConfig.TEMPERATURE,
                                ChatGptConfig.TOP_P
                        )
                )
        );
    }
}
