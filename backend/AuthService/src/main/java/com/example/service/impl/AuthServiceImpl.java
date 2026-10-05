package com.example.service.impl;

import com.example.entity.Role;
import com.example.entity.UserCredential;
import com.example.repository.RoleRepository;
import com.example.repository.UserCredentialRepository;
import com.example.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserCredentialRepository userCredentialRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserCredential signup(UserCredential user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        user.setEnabled(true);

        Role farmerRole = roleRepository
                .findByName(Role.RoleName.FARMER)
                .orElseGet(() ->
                        roleRepository.save(
                                Role.builder()
                                        .name(Role.RoleName.FARMER)
                                        .build()
                        )
                );

        user.setRole(farmerRole);

        return userCredentialRepository.save(user);
    }
}