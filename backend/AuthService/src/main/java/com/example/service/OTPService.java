package com.example.service;

public interface OTPService {

    String generateOTP(String phoneNumber);

    boolean verifyOTP(String phoneNumber, String otp);
}