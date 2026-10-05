package com.example.service.impl;

import com.example.entity.RefreshToken;
import com.example.entity.UserCredential;
import com.example.repository.RefreshTokenRepository;
import com.example.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public RefreshToken createRefreshToken(UserCredential user) {

        RefreshToken refreshToken = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .expiresAt(LocalDateTime.now().plusDays(7))
                .revoked(false)
                .user(user)
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public RefreshToken findByToken(String token) {

        return refreshTokenRepository
                .findByToken(token)
                .orElse(null);
    }

    @Override
    public boolean validateRefreshToken(RefreshToken refreshToken) {

        if (refreshToken == null) {
            return false;
        }

        if (refreshToken.isRevoked()) {
            return false;
        }

        if (refreshToken.getExpiresAt() == null) {
            return false;
        }

        return refreshToken.getExpiresAt()
                .isAfter(LocalDateTime.now());
    }

    @Override
    public void revokeRefreshToken(String token) {

        refreshTokenRepository.findByToken(token)
                .ifPresent(refreshToken -> {

                    refreshToken.setRevoked(true);

                    refreshTokenRepository.save(refreshToken);
                });
    }
}