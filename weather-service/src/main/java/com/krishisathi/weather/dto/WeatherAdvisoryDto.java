package com.krishisathi.weather.dto;

import java.util.List;

public class WeatherAdvisoryDto {
    private String locationName;
    private double temperature;
    private double feelsLike;
    private int humidity;
    private double windSpeedKmH;
    private String condition; // e.g. "Rain", "Clear", "Clouds", "Thunderstorm"
    private String conditionDescription;
    private String iconCode;

    // Agricultural Actionable Insights
    private boolean rainExpectedSoon;
    private String sprayAdvisory; // SAFE, DELAY_SPRAYING, CAUTION
    private String irrigationAdvisory; // DEFER_IRRIGATION, IRRIGATE_LIGHTLY, NORMAL
    private List<String> actionableAlerts;
    private String audioAdvisoryHindi;
    private String audioAdvisoryEnglish;

    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }
    public double getTemperature() { return temperature; }
    public void setTemperature(double temperature) { this.temperature = temperature; }
    public double getFeelsLike() { return feelsLike; }
    public void setFeelsLike(double feelsLike) { this.feelsLike = feelsLike; }
    public int getHumidity() { return humidity; }
    public void setHumidity(int humidity) { this.humidity = humidity; }
    public double getWindSpeedKmH() { return windSpeedKmH; }
    public void setWindSpeedKmH(double windSpeedKmH) { this.windSpeedKmH = windSpeedKmH; }
    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    public String getConditionDescription() { return conditionDescription; }
    public void setConditionDescription(String conditionDescription) { this.conditionDescription = conditionDescription; }
    public String getIconCode() { return iconCode; }
    public void setIconCode(String iconCode) { this.iconCode = iconCode; }
    public boolean isRainExpectedSoon() { return rainExpectedSoon; }
    public void setRainExpectedSoon(boolean rainExpectedSoon) { this.rainExpectedSoon = rainExpectedSoon; }
    public String getSprayAdvisory() { return sprayAdvisory; }
    public void setSprayAdvisory(String sprayAdvisory) { this.sprayAdvisory = sprayAdvisory; }
    public String getIrrigationAdvisory() { return irrigationAdvisory; }
    public void setIrrigationAdvisory(String irrigationAdvisory) { this.irrigationAdvisory = irrigationAdvisory; }
    public List<String> getActionableAlerts() { return actionableAlerts; }
    public void setActionableAlerts(List<String> actionableAlerts) { this.actionableAlerts = actionableAlerts; }
    public String getAudioAdvisoryHindi() { return audioAdvisoryHindi; }
    public void setAudioAdvisoryHindi(String audioAdvisoryHindi) { this.audioAdvisoryHindi = audioAdvisoryHindi; }
    public String getAudioAdvisoryEnglish() { return audioAdvisoryEnglish; }
    public void setAudioAdvisoryEnglish(String audioAdvisoryEnglish) { this.audioAdvisoryEnglish = audioAdvisoryEnglish; }
}
