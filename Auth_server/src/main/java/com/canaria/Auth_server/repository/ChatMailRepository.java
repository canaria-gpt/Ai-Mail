package com.canaria.Auth_server.repository;

import com.canaria.Auth_server.domain.ChatMail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMailRepository extends JpaRepository<ChatMail, Long> {
    List<ChatMail> findAllByLoginId(String loginId);
}
