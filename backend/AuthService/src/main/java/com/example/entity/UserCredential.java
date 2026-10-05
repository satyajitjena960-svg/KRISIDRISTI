package com.example.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_credentials")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCredential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    private String password;

    private boolean enabled;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}