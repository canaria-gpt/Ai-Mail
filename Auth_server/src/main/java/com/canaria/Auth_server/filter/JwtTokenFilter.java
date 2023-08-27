package com.canaria.Auth_server.filter;

import com.canaria.Auth_server.domain.User;
import com.canaria.Auth_server.service.UserService;
import com.canaria.Auth_server.util.JwtTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

// OncePerRequestFilter : 매번 들어갈 때 마다 체크 해주는 필터
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final String secretKey;
    private final JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        String accessToken = request.getHeader("accessToken");
        String refreshToken = request.getHeader("refreshToken");

        // Header의 Authorization 값이 비어있으면 => Jwt Token을 전송하지 않음 => 로그인 하지 않음
        if (accessToken == null) {
            String newAccessToken = activateRefreshToken(refreshToken, request, response, filterChain);
            if (newAccessToken != null) {
                setAuthentication(newAccessToken, request);
            }
            filterChain.doFilter(request, response);
            return;
        }

        // Header의 Authorization 값이 'Bearer '로 시작하지 않으면 => 잘못된 토큰
        if (!accessToken.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 전송받은 값에서 'Bearer ' 뒷부분(Jwt Token) 추출
        String token = accessToken.split(" ")[1];

        // 전송받은 Jwt Token이 만료되었으면 => 다음 필터 진행(인증 X)
        if (JwtTokenUtil.isExpired(token, secretKey)) {
            String newAccessToken = activateRefreshToken(refreshToken, request, response, filterChain);
            if (newAccessToken != null) {
                setAuthentication(newAccessToken, request);
            }
            filterChain.doFilter(request, response);
            return;
        }

        setAuthentication(token, request);
        /*
        if (refreshToken != null){
            boolean isRefreshToken = jwtTokenUtil.checkRefreshToken(refreshToken);
            if (isRefreshToken) {
                String loginId = jwtTokenUtil.userFindByToken(refreshToken).getLoginId();
                User finduser = userService.getLoginUserByLoginId(loginId);
                String newAccessToken = JwtTokenUtil.createToken(finduser.getLoginId(),finduser.getNickname(),"Access");
                response.setHeader("accessToken",newAccessToken);
                setAuthentication(newAccessToken,request);
            }
            else {
                filterChain.doFilter(request, response);
                return;
            }
        }

         */
       // filterChain.doFilter(request, response);
        // Jwt Token에서 loginId 추출
        String loginId = JwtTokenUtil.getLoginId(token, secretKey);

        // 추출한 loginId로 User 찾아오기
        User loginUser = userService.getLoginUserByLoginId(loginId);

        // loginUser 정보로 UsernamePasswordAuthenticationToken 발급
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginUser.getLoginId(), null,List.of(new SimpleGrantedAuthority(loginUser.getRole().name())));
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        System.out.println(authenticationToken.getName());
        // 권한 부여
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request, response);

    }

    public void setAuthentication(String token, HttpServletRequest request) {
        // Jwt Token에서 loginId 추출
        String loginId = JwtTokenUtil.getLoginId(token, secretKey);

        // 추출한 loginId로 User 찾아오기
        User loginUser = userService.getLoginUserByLoginId(loginId);

        // loginUser 정보로 UsernamePasswordAuthenticationToken 발급
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginUser.getLoginId(), null, List.of(new SimpleGrantedAuthority(loginUser.getRole().name())));
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        System.out.println(authenticationToken.getName());
        // 권한 부여
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    public String activateRefreshToken(String refreshToken, HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (refreshToken != null) {
            boolean isRefreshToken = jwtTokenUtil.checkRefreshToken(refreshToken);
            if (isRefreshToken) {
                String loginId = jwtTokenUtil.userFindByToken(refreshToken).getLoginId();
                User finduser = userService.getLoginUserByLoginId(loginId);
                String newAccessToken = JwtTokenUtil.createToken(finduser.getLoginId(), finduser.getNickname(), "Access");
                response.setHeader("accessToken", newAccessToken);
                setAuthentication(newAccessToken, request);
                return newAccessToken;
            } else {
                filterChain.doFilter(request, response);
                return null;
            }
        }
        return null;
    }
}
