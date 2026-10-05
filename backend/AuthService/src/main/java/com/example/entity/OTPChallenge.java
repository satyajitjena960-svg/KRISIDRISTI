package com.example.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp_challenges")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OTPChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phoneNumber;

    private String otp;

    private LocalDateTime expiresAt;

    private boolean verified;

    private int attempts;
}
