package com.emp.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "whatsapp_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WhatsAppLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String recipientPhone;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String messageBody;

    private String audioMediaUrl;

    @Column(nullable = false)
    private String status; // SENT, FAILED, DELIVERED

    private String externalMessageId;

    private LocalDateTime sentAt;

    @PrePersist
    public void onCreate() {
        this.sentAt = LocalDateTime.now();
    }
}