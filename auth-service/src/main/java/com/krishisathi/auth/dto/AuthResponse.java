package com.krishisathi.auth.dto;

import com.krishisathi.auth.model.Role;

public class AuthResponse {
    private String token;
    private Long userId;
    private String phoneNumber;
    private String fullName;
    private Role role;
    private String preferredLanguage;
    private String message;

    public AuthResponse() {}

    public AuthResponse(String token, Long userId, String phoneNumber, String fullName, Role role, String preferredLanguage, String message) {
        this.token = token;
        this.userId = userId;
        this.phoneNumber = phoneNumber;
        this.fullName = fullName;
        this.role = role;
        this.preferredLanguage = preferredLanguage;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
