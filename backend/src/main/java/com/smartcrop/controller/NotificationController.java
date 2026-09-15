package com.smartcrop.controller;

import com.smartcrop.entity.NotificationAlert;
import com.smartcrop.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<NotificationAlert>> getAlerts(@PathVariable Long farmerId) {
        return ResponseEntity.ok(notificationService.getAlertsForFarmer(farmerId));
    }

    @GetMapping("/recent")
    public ResponseEntity<List<NotificationAlert>> getRecent() {
        return ResponseEntity.ok(notificationService.getAllRecentAlerts());
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<NotificationAlert> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }
}
