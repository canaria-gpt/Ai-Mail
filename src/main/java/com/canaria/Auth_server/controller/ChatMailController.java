package com.canaria.Auth_server.controller;


import com.canaria.Auth_server.domain.User;
import com.canaria.Auth_server.dto.ChatRequest;
import com.canaria.Auth_server.service.ChatService;
import com.canaria.Auth_server.service.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ChatMailController {

    private final ChatService chatService;
    private final UserService userService;
/*
    {
        "chatMail" : "asdadasd",
        "loginId" : "asdf"
    }

 */
    @PostMapping("/save")
    public ResponseEntity<String> saveData(Authentication auth, @RequestBody ChatRequest chatRequest){
        chatService.saveChat(auth,chatRequest);
        return ResponseEntity.ok()
                .body("채팅 데이터 저장 완료");
    }

    @GetMapping("/show")
    public ResponseEntity<List<ChatRequest>> showData(Authentication auth){
        User loginUser = userService.getLoginUserByLoginId(auth.getName());
        return ResponseEntity
                .ok(chatService.showChat(loginUser.getLoginId()));
    }
}
