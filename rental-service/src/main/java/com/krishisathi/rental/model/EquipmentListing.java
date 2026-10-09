package com.krishisathi.rental.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "equipment_listings")
public class EquipmentListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String ownerPhone;

    @Column(nullable = false, length = 100)
    private String ownerName;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(nullable = false, length = 50)
    private String category; // "Tractor", "Harvester", "Power Tiller", "Rotavator", "Seed Drill", "Sprayer Drone"

    private String modelDetails; // e.g. "Mahindra 575 DI (45 HP)"

    @Column(nullable = false)
    private Double hourlyRate; // e.g. 500 INR

    @Column(nullable = false)
    private Double dailyRate; // e.g. 3500 INR

    private String locationName; // "Pipariya Mandi, Hoshangabad"

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false, length = 20)
    private String contactNumber;

    private boolean available = true;

    private String imageUrl;

    @Column(length = 1000)
    private String description;

    private LocalDateTime createdAt = LocalDateTime.now();

    public EquipmentListing() {}

    public EquipmentListing(String ownerPhone, String ownerName, String title, String category, String modelDetails,
                            Double hourlyRate, Double dailyRate, String locationName, Double latitude, Double longitude,
                            String contactNumber, String imageUrl, String description) {
        this.ownerPhone = ownerPhone;
        this.ownerName = ownerName;
        this.title = title;
        this.category = category;
        this.modelDetails = modelDetails;
        this.hourlyRate = hourlyRate;
        this.dailyRate = dailyRate;
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.contactNumber = contactNumber;
        this.imageUrl = imageUrl;
        this.description = description;
        this.available = true;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOwnerPhone() { return ownerPhone; }
    public void setOwnerPhone(String ownerPhone) { this.ownerPhone = ownerPhone; }
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getModelDetails() { return modelDetails; }
    public void setModelDetails(String modelDetails) { this.modelDetails = modelDetails; }
    public Double getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(Double hourlyRate) { this.hourlyRate = hourlyRate; }
    public Double getDailyRate() { return dailyRate; }
    public void setDailyRate(Double dailyRate) { this.dailyRate = dailyRate; }
    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
