package com.example.service.impl;

import com.example.entity.UserCredential;
import com.example.repository.UserCredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserCredentialRepository userCredentialRepository;

    @Override
    public UserDetails loadUserByUsername(String phoneNumber)
            throws UsernameNotFoundException {

        UserCredential user = getUser(phoneNumber);

        return User.builder()
                .username(user.getPhoneNumber())
                .password(user.getPassword())
                .disabled(!user.isEnabled())
                .roles(user.getRole() != null
                        ? user.getRole().getName().name()
                        : "FARMER")
                .build();
    }

    public UserCredential getUser(String phoneNumber) {

        return userCredentialRepository
                .findByPhoneNumber(phoneNumber)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found with phone number: "
                                        + phoneNumber
                        )
                );
    }
}