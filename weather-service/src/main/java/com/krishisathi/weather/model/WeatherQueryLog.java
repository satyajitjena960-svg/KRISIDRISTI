package com.krishisathi.weather.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "weather_query_logs")
public class WeatherQueryLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double latitude;
    private Double longitude;
    private String cityName;
    private Double temperature;
    private Integer humidity;
    private String weatherCondition;
    private LocalDateTime queryTime = LocalDateTime.now();

    public WeatherQueryLog() {}

    public WeatherQueryLog(Double latitude, Double longitude, String cityName, Double temperature, Integer humidity, String weatherCondition) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.cityName = cityName;
        this.temperature = temperature;
        this.humidity = humidity;
        this.weatherCondition = weatherCondition;
        this.queryTime = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getCityName() { return cityName; }
    public void setCityName(String cityName) { this.cityName = cityName; }
    public Double getTemperature() { return temperature; }
    public void setTemperature(Double temperature) { this.temperature = temperature; }
    public Integer getHumidity() { return humidity; }
    public void setHumidity(Integer humidity) { this.humidity = humidity; }
    public String getWeatherCondition() { return weatherCondition; }
    public void setWeatherCondition(String weatherCondition) { this.weatherCondition = weatherCondition; }
    public LocalDateTime getQueryTime() { return queryTime; }
    public void setQueryTime(LocalDateTime queryTime) { this.queryTime = queryTime; }
}
