package org.krishisathi.diagnosisservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.krishisathi.diagnosisservice.enums.DiagnosisStatus;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "diagnosis_status_history")
public class DiagnosisStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @Column(nullable = false)
    private UUID diagnosisId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiagnosisStatus status;

    @Column(nullable = false)
    private LocalDateTime changedAt;

    @Column(nullable = false)
    private String correlationId;

    @PrePersist
    public void onCreate() {

        changedAt = LocalDateTime.now();
    }
}