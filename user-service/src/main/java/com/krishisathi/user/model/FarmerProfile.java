package com.krishisathi.user.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "farmer_profiles")
public class FarmerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String phoneNumber;

    @Column(nullable = false, length = 100)
    private String fullName;

    private String village;
    private String district;
    private String state;

    private Double landAreaAcres;
    private String primaryCrops;

    // GPS coordinates for hyper-local weather & equipment rental radius
    private Double latitude;
    private Double longitude;

    private String preferredLanguage = "hi";
    private LocalDateTime updatedAt = LocalDateTime.now();

    public FarmerProfile() {}

    public FarmerProfile(String phoneNumber, String fullName, String village, String district, String state, Double landAreaAcres, Double latitude, Double longitude) {
        this.phoneNumber = phoneNumber;
        this.fullName = fullName;
        this.village = village;
        this.district = district;
        this.state = state;
        this.landAreaAcres = landAreaAcres;
        this.latitude = latitude;
        this.longitude = longitude;
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public Double getLandAreaAcres() { return landAreaAcres; }
    public void setLandAreaAcres(Double landAreaAcres) { this.landAreaAcres = landAreaAcres; }

    public String getPrimaryCrops() { return primaryCrops; }
    public void setPrimaryCrops(String primaryCrops) { this.primaryCrops = primaryCrops; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
