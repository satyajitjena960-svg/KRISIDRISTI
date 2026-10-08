package com.smartcrop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "weather_risk_assessments")
public class WeatherRiskAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String cropType;

    @Column(nullable = false)
    private String district;

    private String state;
    private Double temperatureC;
    private Double humidityPercent;
    private Double rainfallMm;
    private String weatherCondition; // "Humid & Overcast", "Sunny", "Rainy"
    private String forecastSummary;

    private String riskLevel; // HIGH, MODERATE, LOW
    private Double riskScore; // 0 - 100

    @Column(columnDefinition = "TEXT")
    private String primaryVulnerableDisease;

    @Column(columnDefinition = "TEXT")
    private String riskWarning;

    @Column(columnDefinition = "TEXT")
    private String preventiveAdvice;

    private LocalDateTime assessedAt;

    public WeatherRiskAssessment() {
        this.assessedAt = LocalDateTime.now();
    }

    public WeatherRiskAssessment(String cropType, String district, String state, Double temperatureC,
                                 Double humidityPercent, Double rainfallMm, String weatherCondition,
                                 String forecastSummary, String riskLevel, Double riskScore,
                                 String primaryVulnerableDisease, String riskWarning, String preventiveAdvice) {
        this.cropType = cropType;
        this.district = district;
        this.state = state;
        this.temperatureC = temperatureC;
        this.humidityPercent = humidityPercent;
        this.rainfallMm = rainfallMm;
        this.weatherCondition = weatherCondition;
        this.forecastSummary = forecastSummary;
        this.riskLevel = riskLevel;
        this.riskScore = riskScore;
        this.primaryVulnerableDisease = primaryVulnerableDisease;
        this.riskWarning = riskWarning;
        this.preventiveAdvice = preventiveAdvice;
        this.assessedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public Double getTemperatureC() { return temperatureC; }
    public void setTemperatureC(Double temperatureC) { this.temperatureC = temperatureC; }

    public Double getHumidityPercent() { return humidityPercent; }
    public void setHumidityPercent(Double humidityPercent) { this.humidityPercent = humidityPercent; }

    public Double getRainfallMm() { return rainfallMm; }
    public void setRainfallMm(Double rainfallMm) { this.rainfallMm = rainfallMm; }

    public String getWeatherCondition() { return weatherCondition; }
    public void setWeatherCondition(String weatherCondition) { this.weatherCondition = weatherCondition; }

    public String getForecastSummary() { return forecastSummary; }
    public void setForecastSummary(String forecastSummary) { this.forecastSummary = forecastSummary; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public Double getRiskScore() { return riskScore; }
    public void setRiskScore(Double riskScore) { this.riskScore = riskScore; }

    public String getPrimaryVulnerableDisease() { return primaryVulnerableDisease; }
    public void setPrimaryVulnerableDisease(String primaryVulnerableDisease) { this.primaryVulnerableDisease = primaryVulnerableDisease; }

    public String getRiskWarning() { return riskWarning; }
    public void setRiskWarning(String riskWarning) { this.riskWarning = riskWarning; }

    public String getPreventiveAdvice() { return preventiveAdvice; }
    public void setPreventiveAdvice(String preventiveAdvice) { this.preventiveAdvice = preventiveAdvice; }

    public LocalDateTime getAssessedAt() { return assessedAt; }
    public void setAssessedAt(LocalDateTime assessedAt) { this.assessedAt = assessedAt; }
}
