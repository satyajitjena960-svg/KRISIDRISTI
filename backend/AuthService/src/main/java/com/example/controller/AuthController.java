package com.example.controller;

import com.example.entity.RefreshToken;
import com.example.entity.UserCredential;
import com.example.service.AuthService;
import com.example.service.RefreshTokenService;
import com.example.utility.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/signup")
    public ResponseEntity<UserCredential> signup(
            @RequestBody UserCredential user) {

        return ResponseEntity.ok(authService.signup(user));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestParam String username,
            @RequestParam String password) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(username);

        String accessToken =
                jwtUtil.generateToken(userDetails.getUsername());

        UserCredential userCredential =
                ((com.example.service.impl.CustomUserDetailsService)
                        userDetailsService)
                        .getUser(username);

        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(userCredential);

        return ResponseEntity.ok(
                new LoginResponse(
                        accessToken,
                        refreshToken.getToken()
                )
        );
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refresh(
            @RequestParam String refreshToken) {

        RefreshToken token =
                refreshTokenService
                        .findByToken(refreshToken);

        if (!refreshTokenService.validateRefreshToken(token)) {
            return ResponseEntity.status(401).build();
        }

        String accessToken =
                jwtUtil.generateToken(
                        token.getUser().getPhoneNumber()
                );

        return ResponseEntity.ok(
                new LoginResponse(
                        accessToken,
                        token.getToken()
                )
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(
            @RequestParam String refreshToken) {

        refreshTokenService.revokeRefreshToken(refreshToken);

        return ResponseEntity.ok("Logout successful");
    }

    public record LoginResponse(
            String accessToken,
            String refreshToken
    ) {
    }
}