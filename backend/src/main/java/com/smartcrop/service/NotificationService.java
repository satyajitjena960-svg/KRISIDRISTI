package com.smartcrop.service;

import com.smartcrop.entity.NotificationAlert;
import com.smartcrop.repository.NotificationAlertRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationAlertRepository notificationRepository;

    public NotificationService(NotificationAlertRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<NotificationAlert> getAlertsForFarmer(Long farmerId) {
        return notificationRepository.findByFarmerIdOrderByCreatedAtDesc(farmerId);
    }

    public List<NotificationAlert> getAllRecentAlerts() {
        return notificationRepository.findTop20ByOrderByCreatedAtDesc();
    }

    public NotificationAlert markAsRead(Long alertId) {
        NotificationAlert alert = notificationRepository.findById(alertId)
                .orElseThrow(() -> new IllegalArgumentException("Alert not found with ID: " + alertId));
        alert.setIsRead(true);
        return notificationRepository.save(alert);
    }

    public NotificationAlert createAlert(Long farmerId, String title, String message, String type, String priority, String route) {
        NotificationAlert alert = new NotificationAlert(farmerId, title, message, type, priority, route);
        return notificationRepository.save(alert);
    }
}
