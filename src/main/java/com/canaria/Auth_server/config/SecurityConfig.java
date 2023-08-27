package com.canaria.Auth_server.config;

import com.canaria.Auth_server.domain.UserRole;
import com.canaria.Auth_server.filter.JwtTokenFilter;
import com.canaria.Auth_server.service.UserService;
import com.canaria.Auth_server.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class    SecurityConfig {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserService userService;
    private static String secretKey = "my-secret-key-123123";

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .httpBasic(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(configurer -> configurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(new JwtTokenFilter(userService, secretKey,jwtTokenUtil), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                //.requestMatchers("/**").authenticated()
                .requestMatchers("/**").permitAll()
                .requestMatchers("/chat/show").authenticated()
                .and().build();
    }

}
