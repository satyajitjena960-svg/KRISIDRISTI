package org.krishisathi.diagnosisservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "prediction")
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @Column(nullable = false)
    private UUID diagnosisId;

    @Column(nullable = false)
    private String cropCode;

    @Column(nullable = false)
    private String diseaseCode;

    @Column(nullable = false)
    private Double confidence;

    @Column(nullable = false)
    private String modelVersion;

    private Long inferenceDuration;

    @Column(columnDefinition = "TEXT")
    private String preprocessingConfig;

    @Column(columnDefinition = "TEXT")
    private String topPredictions;

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();
    }
}