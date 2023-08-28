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
public class IntroChatGptService {
    private static final String intro_content = "당신은 세계 최고의 문장 교정 전문가입니다. 다음은 자소서 내용입니다. 해당 자소서의 내용을 아래 단계에 따라 교정해주시기 바랍니다." +
            "1. 오타나 비문 없이 작성합니다." +
            "2. 일관된 말투를 사용합니다." +
            "3. 나를 지칭하는 인칭 대명사를 최소화합니다." +
            "4. 통상적인 준말은 제외하고, 그 외의 준말은 지양합니다." +
            "5. 존댓말을 사용합니다." +
            "6. 격식있는 말투를 사용합니다." +
            "7. 작성자가 전달하고자 하는 핵심 메시지는 왜곡이나 누락없이 전달합니다." +
            "8. 모호하게 쓰지 않도록 합니다." +
            "9. 추가적인 표현을 전달하지 않습니다." +
            "10. 위의 사항을 고려하여 자소서의 내용을 수정합니다." +
            "11. 한국어로 작성해주세요." +
            "자소서의 내용은 다음과 같습니다." +
            "---" +
            "자소서 내용: %s" +
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
        String chatMessage = String.format(intro_content, requestDto.getQuestion());
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