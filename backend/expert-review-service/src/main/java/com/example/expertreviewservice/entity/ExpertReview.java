package com.example.expertreviewservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

public class ExpertReview {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String reviewId;
    private String diagnosisId;
    private String expertId;
    private String description;
    private String status;
    private String cropName;
    private String predictedDisease;
    private Double confidenceScore;

    @Column(length = 1000)
    private String imageUrl;
}
