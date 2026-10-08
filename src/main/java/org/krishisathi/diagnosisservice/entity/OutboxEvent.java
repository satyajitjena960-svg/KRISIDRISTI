package org.krishisathi.diagnosisservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.krishisathi.diagnosisservice.enums.OutboxEventStatus;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "outbox_event")
public class OutboxEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @Column(nullable = false)
    private UUID eventId;

    @Column(nullable = false)
    private String eventType;

    @Column(nullable = false)
    private LocalDateTime occurredAt;

    @Column(nullable = false)
    private String correlationId;

    @Column(nullable = false)
    private String producer;

    @Column(nullable = false)
    private String schemaVersion;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String payload;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OutboxEventStatus status;

    private LocalDateTime publishedAt;

    @PrePersist
    public void onCreate() {

        occurredAt = LocalDateTime.now();

        if (status == null) {
            status = OutboxEventStatus.PENDING;
        }
    }
}