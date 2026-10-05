package com.example.repository;

import com.example.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCredentialRepository
        extends JpaRepository<UserCredential, Long> {

    Optional<UserCredential> findByPhoneNumber(String phoneNumber);
}