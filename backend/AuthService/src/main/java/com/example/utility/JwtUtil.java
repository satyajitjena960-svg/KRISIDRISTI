package com.example.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final String SECRET_KEY =
            "TaK+xV^jk3289048392048230948230948203";

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes(StandardCharsets.UTF_8)
        );
    }

    public String generateToken(String username) {

        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .header()
                .type("JWT")
                .and()
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60)
                )
                .signWith(getSigningKey())
                .compact();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public Boolean isTokenExpired(String token) {
        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }
}