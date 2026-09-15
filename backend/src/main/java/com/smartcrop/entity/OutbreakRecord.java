package com.smartcrop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "outbreak_records")
public class OutbreakRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String state; // e.g. "Odisha"

    @Column(nullable = false)
    private String district; // e.g. "Cuttack", "Khordha", "Puri", "Balasore"

    private String primaryDisease; // e.g. "Tomato Early Blight", "Rice Blast"
    private String affectedCrop;
    private Integer reportedCases; // e.g. 37
    private String alertLevel; // "OUTBREAK_WARNING", "WATCH", "NORMAL"
    private Double latitude;
    private Double longitude;
    private LocalDateTime lastUpdated;

    public OutbreakRecord() {
        this.lastUpdated = LocalDateTime.now();
    }

    public OutbreakRecord(String state, String district, String primaryDisease, String affectedCrop,
                          Integer reportedCases, String alertLevel, Double latitude, Double longitude) {
        this.state = state;
        this.district = district;
        this.primaryDisease = primaryDisease;
        this.affectedCrop = affectedCrop;
        this.reportedCases = reportedCases;
        this.alertLevel = alertLevel;
        this.latitude = latitude;
        this.longitude = longitude;
        this.lastUpdated = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getPrimaryDisease() { return primaryDisease; }
    public void setPrimaryDisease(String primaryDisease) { this.primaryDisease = primaryDisease; }

    public String getAffectedCrop() { return affectedCrop; }
    public void setAffectedCrop(String affectedCrop) { this.affectedCrop = affectedCrop; }

    public Integer getReportedCases() { return reportedCases; }
    public void setReportedCases(Integer reportedCases) { this.reportedCases = reportedCases; }

    public String getAlertLevel() { return alertLevel; }
    public void setAlertLevel(String alertLevel) { this.alertLevel = alertLevel; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
}
