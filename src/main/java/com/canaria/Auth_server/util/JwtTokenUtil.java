package com.canaria.Auth_server.util;

import com.canaria.Auth_server.domain.RefreshToken;
import com.canaria.Auth_server.repository.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Transactional
@RequiredArgsConstructor
public class JwtTokenUtil {

    private final RefreshTokenRepository refreshTokenRepository;

    // JWT Token 발급
    private static final long ACCESS_TIME =  20 * 60 * 1000L; //유효기간 20분
    private static final long REFRESH_TIME =  3 * 1440 * 60 * 1000L; //유효기간 3일

    private static String secretKey= "my-secret-key-123123";

    public static String createToken(String loginId, String nickname, String type) {
        // Claim = Jwt Token에 들어갈 정보
        // Claim에 loginId를 넣어 줌으로써 나중에 loginId를 꺼낼 수 있음
        Claims claims = Jwts.claims();
        claims.put("nickname", nickname);
        claims.put("loginId", loginId);

        long expireTimeMs = type.equals("Access") ? ACCESS_TIME : REFRESH_TIME;

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTimeMs))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // Claims에서 loginId 꺼내기
    public static String getLoginId(String token, String secretKey) {
        return extractClaims(token, secretKey).get("loginId").toString();
    }

    // 밝급된 Token이 만료 시간이 지났는지 체크
    public static boolean isExpired(String token, String secretKey) {
        Date expiredDate = extractClaims(token, secretKey).getExpiration();
        // Token의 만료 날짜가 지금보다 이전인지 check
        return expiredDate.before(new Date());
    }

    // SecretKey를 사용해 Token Parsing
    private static Claims extractClaims(String token, String secretKey) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    public boolean checkRefreshToken(String token){
        return refreshTokenRepository.existsByRefreshToken(token);
    }

    public RefreshToken userFindByToken(String token){
        return refreshTokenRepository.findByRefreshToken(token);
    }

}
