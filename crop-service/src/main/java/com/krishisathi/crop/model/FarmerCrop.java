package com.krishisathi.crop.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "farmer_crops")
public class FarmerCrop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String farmerPhone;

    @Column(nullable = false, length = 50)
    private String cropName; // e.g. "Wheat", "Rice", "Cotton", "Soybean", "Mustard"

    private String variety; // e.g. "Sharbati", "Basmati 1509"

    @Column(nullable = false)
    private LocalDate sowingDate;

    @Column(nullable = false)
    private Double landAreaAcres;

    private String soilType; // "Loamy", "Clay", "Sandy", "Black"

    private LocalDateTime createdAt = LocalDateTime.now();

    public FarmerCrop() {}

    public FarmerCrop(String farmerPhone, String cropName, String variety, LocalDate sowingDate, Double landAreaAcres, String soilType) {
        this.farmerPhone = farmerPhone;
        this.cropName = cropName;
        this.variety = variety;
        this.sowingDate = sowingDate;
        this.landAreaAcres = landAreaAcres;
        this.soilType = soilType;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFarmerPhone() { return farmerPhone; }
    public void setFarmerPhone(String farmerPhone) { this.farmerPhone = farmerPhone; }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getVariety() { return variety; }
    public void setVariety(String variety) { this.variety = variety; }

    public LocalDate getSowingDate() { return sowingDate; }
    public void setSowingDate(LocalDate sowingDate) { this.sowingDate = sowingDate; }

    public Double getLandAreaAcres() { return landAreaAcres; }
    public void setLandAreaAcres(Double landAreaAcres) { this.landAreaAcres = landAreaAcres; }

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
