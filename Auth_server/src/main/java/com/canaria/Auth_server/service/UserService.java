package com.canaria.Auth_server.service;

import com.canaria.Auth_server.domain.RefreshToken;
import com.canaria.Auth_server.domain.User;
import com.canaria.Auth_server.dto.JoinRequest;
import com.canaria.Auth_server.dto.LoginRequest;
import com.canaria.Auth_server.dto.TokenDto;
import com.canaria.Auth_server.repository.RefreshTokenRepository;
import com.canaria.Auth_server.repository.UserRepository;
import com.canaria.Auth_server.util.JwtTokenUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.Token;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final RefreshTokenRepository refreshTokenRepository;

    /** 아이디 중복 체크 **/
    public boolean checkLoginIdDuplicate(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    /** 닉네임 중복 체크 **/
    public boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    /** 회원가입 **/
    public void join2(JoinRequest req) {
        userRepository.save(req.toEntity(encoder.encode(req.getPassword())));
    }

    /** 로그인 **/
    public TokenDto login(LoginRequest req) {
        Optional<User> optionalUser = userRepository.findByLoginId(req.getLoginId());
        // loginId와 일치하는 User가 없으면 null return
        if(optionalUser.isEmpty()) {
            throw new RuntimeException("Not found Account");
        }

        User user = optionalUser.get();

        // 찾아온 User의 password와 입력된 password가 다르면 null return
        if(!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Not matches Password");
        }
        // return user;

        TokenDto loginToken = new TokenDto(JwtTokenUtil.createToken(user.getLoginId(),user.getNickname(),"Access"),
                JwtTokenUtil.createToken(user.getLoginId(), user.getNickname(),"Refresh"));

        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByLoginId(req.getLoginId());

        if(refreshToken.isPresent()){
            refreshTokenRepository.save(refreshToken.get().updateToken(loginToken.getRefreshToken()));
        }
        else {
            RefreshToken newToken = new RefreshToken(loginToken.getRefreshToken(), req.getLoginId());
            refreshTokenRepository.save(newToken);
        }

        return loginToken;

    }

    /**
     * userId(Long)를 입력받아 User을 return 해주는 기능
     * 인증, 인가 시 사용
     * userId가 null이거나(로그인 X) userId로 찾아온 User가 없으면 null return
     * userId로 찾아온 User가 존재하면 User return
     */
    public User getLoginUserById(Long userId) {
        if(userId == null) return null;

        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }

    /**
     * loginId(String)를 입력받아 User을 return 해주는 기능
     * 인증, 인가 시 사용
     * loginId가 null이거나(로그인 X) userId로 찾아온 User가 없으면 null return
     * loginId로 찾아온 User가 존재하면 User return
     */
    public User getLoginUserByLoginId(String loginId) {
        if(loginId == null) return null;

        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }
}