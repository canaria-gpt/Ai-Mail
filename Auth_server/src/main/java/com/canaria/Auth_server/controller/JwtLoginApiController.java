package com.canaria.Auth_server.controller;

import com.canaria.Auth_server.domain.User;
import com.canaria.Auth_server.dto.JoinRequest;
import com.canaria.Auth_server.dto.LoginRequest;
import com.canaria.Auth_server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class JwtLoginApiController {

    private final UserService userService;

    /* 더미데이터
    {
    "loginId" : "asdf",
    "password" : "1234",
    "passwordCheck" : "1234",
    "nickname" : "asd"
}

     */
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody JoinRequest joinRequest) {
        // loginId 중복 체크
        if(userService.checkLoginIdDuplicate(joinRequest.getLoginId())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("회원가입 실패");
        }
        // 닉네임 중복 체크
        if(userService.checkNicknameDuplicate(joinRequest.getNickname())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("회원가입 실패");
        }
        // password와 passwordCheck가 같은지 체크
        if(!joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("회원가입 실패");
        }

        userService.join2(joinRequest);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        return ResponseEntity.ok(userService.login(loginRequest));

    }

    @GetMapping("/admin")
    public String adminPage() {
        return "관리자 페이지 접근 성공";
    }
}
