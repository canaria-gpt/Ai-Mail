package com.canaria.Auth_server.controller;

import com.canaria.Auth_server.domain.User;
import com.canaria.Auth_server.dto.JoinRequest;
import com.canaria.Auth_server.dto.LoginRequest;
import com.canaria.Auth_server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/jwt-login")
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
    public String join(@RequestBody JoinRequest joinRequest) {

        // loginId 중복 체크
        if(userService.checkLoginIdDuplicate(joinRequest.getLoginId())) {
            return "로그인 아이디가 중복됩니다.";
        }
        // 닉네임 중복 체크
        if(userService.checkNicknameDuplicate(joinRequest.getNickname())) {
            return "닉네임이 중복됩니다.";
        }
        // password와 passwordCheck가 같은지 체크
        if(!joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
            return"바밀번호가 일치하지 않습니다.";
        }

        userService.join2(joinRequest);
        return "회원가입 성공";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        return ResponseEntity.ok(userService.login(loginRequest));

    }

    /*
    @GetMapping("/info")
    public String userInfo(Authentication auth) {
        User loginUser = userService.getLoginUserByLoginId(auth.getName());

        return String.format("loginId : %s\nnickname : %s\nrole : %s",
                loginUser.getLoginId(), loginUser.getNickname(), loginUser.getRole().name());
    }
    */
    @GetMapping("/admin")
    public String adminPage() {
        return "관리자 페이지 접근 성공";
    }
}
