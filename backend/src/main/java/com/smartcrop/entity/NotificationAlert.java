package com.smartcrop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification_alerts")
public class NotificationAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long farmerId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    private String alertType; // "DISEASE_RISK", "FOLLOW_UP_REMINDER", "OUTBREAK_WARNING", "EXPERT_CONSULTATION"
    private String priority; // "HIGH", "MEDIUM", "LOW"
    private Boolean isRead;
    private LocalDateTime createdAt;
    private String actionRoute;

    public NotificationAlert() {
        this.createdAt = LocalDateTime.now();
        this.isRead = false;
        this.priority = "MEDIUM";
    }

    public NotificationAlert(Long farmerId, String title, String message, String alertType, String priority, String actionRoute) {
        this.farmerId = farmerId;
        this.title = title;
        this.message = message;
        this.alertType = alertType;
        this.priority = priority != null ? priority : "MEDIUM";
        this.actionRoute = actionRoute;
        this.isRead = false;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getAlertType() { return alertType; }
    public void setAlertType(String alertType) { this.alertType = alertType; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getActionRoute() { return actionRoute; }
    public void setActionRoute(String actionRoute) { this.actionRoute = actionRoute; }
}
