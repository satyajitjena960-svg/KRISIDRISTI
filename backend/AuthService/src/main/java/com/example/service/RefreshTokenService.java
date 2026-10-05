package com.example.service;

import com.example.entity.RefreshToken;
import com.example.entity.UserCredential;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(UserCredential user);

    RefreshToken findByToken(String token);

    boolean validateRefreshToken(RefreshToken refreshToken);

    void revokeRefreshToken(String token);
}