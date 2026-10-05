package com.example.service.impl;

import com.example.entity.OTPChallenge;
import com.example.repository.OTPChallengeRepository;
import com.example.service.OTPService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OTPServiceImpl implements OTPService {

    private final OTPChallengeRepository otpChallengeRepository;

    @Override
    public String generateOTP(String phoneNumber) {

        String otp = String.format(
                "%06d",
                new Random().nextInt(1_000_000)
        );

        OTPChallenge challenge = OTPChallenge.builder()
                .phoneNumber(phoneNumber)
                .otp(otp)
                .expiresAt(LocalDateTime.now().plusMinutes(5))
                .verified(false)
                .attempts(0)
                .build();

        otpChallengeRepository.save(challenge);

        return otp;
    }

    @Override
    public boolean verifyOTP(String phoneNumber, String otp) {

        OTPChallenge challenge =
                otpChallengeRepository
                        .findTopByPhoneNumberOrderByIdDesc(phoneNumber)
                        .orElse(null);

        if (challenge == null) {
            return false;
        }

        if (challenge.isVerified()) {
            return false;
        }

        if (challenge.getExpiresAt().isBefore(LocalDateTime.now())) {
            return false;
        }

        if (challenge.getAttempts() >= 5) {
            return false;
        }

        challenge.setAttempts(challenge.getAttempts() + 1);

        if (!challenge.getOtp().equals(otp)) {
            otpChallengeRepository.save(challenge);
            return false;
        }

        challenge.setVerified(true);
        otpChallengeRepository.save(challenge);

        return true;
    }
}