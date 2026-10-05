package com.example.repository;

import com.example.entity.OTPChallenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OTPChallengeRepository
        extends JpaRepository<OTPChallenge, Long> {

    Optional<OTPChallenge> findTopByPhoneNumberOrderByIdDesc(
            String phoneNumber
    );
}
