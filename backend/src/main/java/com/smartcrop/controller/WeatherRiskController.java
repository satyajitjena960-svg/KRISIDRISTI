package com.smartcrop.controller;

import com.smartcrop.entity.WeatherRiskAssessment;
import com.smartcrop.service.WeatherRiskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weather-risk")
public class WeatherRiskController {

    private final WeatherRiskService weatherRiskService;

    public WeatherRiskController(WeatherRiskService weatherRiskService) {
        this.weatherRiskService = weatherRiskService;
    }

    @GetMapping("/evaluate")
    public ResponseEntity<WeatherRiskAssessment> evaluateRisk(
            @RequestParam(defaultValue = "Tomato") String crop,
            @RequestParam(defaultValue = "Cuttack") String district,
            @RequestParam(defaultValue = "Odisha") String state) {
        return ResponseEntity.ok(weatherRiskService.evaluateRisk(crop, district, state));
    }

    @GetMapping("/district/{district}")
    public ResponseEntity<List<WeatherRiskAssessment>> getByDistrict(@PathVariable String district) {
        return ResponseEntity.ok(weatherRiskService.getAssessmentsByDistrict(district));
    }

    @GetMapping("/recent")
    public ResponseEntity<List<WeatherRiskAssessment>> getRecent() {
        return ResponseEntity.ok(weatherRiskService.getRecentAssessments());
    }
}
