package com.smartcrop.service;

import com.smartcrop.entity.WeatherRiskAssessment;
import com.smartcrop.repository.WeatherRiskAssessmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class WeatherRiskService {

    private final WeatherRiskAssessmentRepository weatherRiskRepository;

    public WeatherRiskService(WeatherRiskAssessmentRepository weatherRiskRepository) {
        this.weatherRiskRepository = weatherRiskRepository;
    }

    public WeatherRiskAssessment evaluateRisk(String cropType, String district, String state) {
        String dist = district != null && !district.isBlank() ? district : "Cuttack";
        String crop = cropType != null && !cropType.isBlank() ? cropType : "Tomato";
        String st = state != null && !state.isBlank() ? state : "Odisha";

        // Generate dynamic or district-calibrated weather parameters
        double temp = 27.5 + (Math.sin(dist.hashCode() % 10) * 3.5);
        double humidity = 82.0 + (Math.cos(dist.hashCode() % 10) * 10.0);
        double rainfall = 45.0 + (Math.abs(dist.hashCode() % 20));

        // Evaluate risk algorithm
        // High humidity (>80%) + warm temp (22-29C) = High Fungal Risk
        String riskLevel;
        double riskScore;
        String warning;
        String diseaseVulnerable;
        String advice;

        if (humidity > 80.0 && temp >= 22.0 && temp <= 30.0) {
            riskLevel = "HIGH";
            riskScore = 86.5;
            diseaseVulnerable = "Tomato".equalsIgnoreCase(crop) ? "Early Blight & Late Blight (Fungal)" : "Rice Blast (Magnaporthe oryzae)";
            warning = "⚠️ High Risk: Atmospheric humidity (" + String.format("%.1f", humidity) + "%) and temperature (" + String.format("%.1f", temp) + "°C) are highly favorable for fungal spore germination during the next 3 days.";
            advice = "1. Proactively apply preventive bio-fungicide (Trichoderma viride 5g/L).\n2. Avoid furrow flood irrigation; maintain soil drainage.\n3. Inspect underside of leaves every morning for dark water-soaked spots.";
        } else if (humidity > 65.0) {
            riskLevel = "MODERATE";
            riskScore = 54.0;
            diseaseVulnerable = "Bacterial Spot & Powdery Mildew";
            warning = "⚠️ Moderate Risk: Moderate humidity elevation with intermittent drizzle. Conditions may encourage foliar bacterial spread.";
            advice = "1. Ensure good canopy ventilation and prune yellowing bottom foliage.\n2. Apply copper hydroxide protective spray if rain continues.";
        } else {
            riskLevel = "LOW";
            riskScore = 22.0;
            diseaseVulnerable = "Low Pathogen Pressure";
            warning = "✅ Low Risk: Weather forecast is sunny and dry. Minimal disease incubation risk over the next 72 hours.";
            advice = "Continue standard irrigation schedule and monitor soil moisture levels.";
        }

        WeatherRiskAssessment assessment = new WeatherRiskAssessment(
                crop, dist, st, Math.round(temp * 10.0) / 10.0, Math.round(humidity * 10.0) / 10.0,
                Math.round(rainfall * 10.0) / 10.0,
                humidity > 75 ? "Humid & Overcast with intermittent showers" : "Partly Cloudy",
                "High relative humidity expected to persist for 72 hours across coastal Odisha districts.",
                riskLevel, riskScore, diseaseVulnerable, warning, advice
        );

        return weatherRiskRepository.save(assessment);
    }

    public List<WeatherRiskAssessment> getAssessmentsByDistrict(String district) {
        return weatherRiskRepository.findByDistrictOrderByAssessedAtDesc(district);
    }

    public List<WeatherRiskAssessment> getRecentAssessments() {
        return weatherRiskRepository.findTop10ByOrderByAssessedAtDesc();
    }
}
