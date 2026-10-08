package com.smartcrop.controller;

import com.smartcrop.dto.AnalyticsDashboardDto;
import com.smartcrop.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<AnalyticsDashboardDto> getDashboard() {
        return ResponseEntity.ok(analyticsService.getDashboardKpis());
    }
}
