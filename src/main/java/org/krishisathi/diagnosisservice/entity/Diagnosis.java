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
@Table(name = "diagnosis")
public class Diagnosis {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @Column(nullable = false)
    private String mediaId;

    @Column(nullable = false)
    private String cropCode;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private boolean requestAudio;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiagnosisStatus status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column
    private String correlationId;

    @PrePersist
    public void onCreate() {

        if (uuid == null) {
            uuid = UUID.randomUUID();
        }

        if (correlationId == null) {
            correlationId = "dgn-" + uuid;
        }

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (status == null) {
            status = DiagnosisStatus.CREATED;
        }
    }

    @PreUpdate
    public void onUpdate() {

        updatedAt = LocalDateTime.now();
    }
}