package com.smartcrop.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "farm_plots")
public class FarmPlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long farmerId;

    @Column(nullable = false)
    private String plotName; // e.g. "East Plot A"

    @Column(nullable = false)
    private String cropType; // Rice, Tomato, Potato, Chili, etc.

    private String variety; // e.g. "Swarna (Rice)", "Pusa Ruby (Tomato)", "Kufri Jyoti (Potato)"
    private Double acreage; // e.g. 2.0, 1.0, 1.5
    private LocalDate plantingDate;
    private String location; // Village/District
    private String soilType; // Loamy, Clay, Alluvial
    private String irrigationType; // Drip, Canal, Rainfed
    private String previousDiseases; // e.g. "Early Blight (2025)"
    private String treatmentsApplied; // e.g. "Neem oil spray, Copper oxychloride"

    public FarmPlot() {}

    public FarmPlot(Long farmerId, String plotName, String cropType, String variety, Double acreage,
                    LocalDate plantingDate, String location, String soilType, String irrigationType,
                    String previousDiseases, String treatmentsApplied) {
        this.farmerId = farmerId;
        this.plotName = plotName;
        this.cropType = cropType;
        this.variety = variety;
        this.acreage = acreage;
        this.plantingDate = plantingDate;
        this.location = location;
        this.soilType = soilType;
        this.irrigationType = irrigationType;
        this.previousDiseases = previousDiseases;
        this.treatmentsApplied = treatmentsApplied;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }

    public String getPlotName() { return plotName; }
    public void setPlotName(String plotName) { this.plotName = plotName; }

    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }

    public String getVariety() { return variety; }
    public void setVariety(String variety) { this.variety = variety; }

    public Double getAcreage() { return acreage; }
    public void setAcreage(Double acreage) { this.acreage = acreage; }

    public LocalDate getPlantingDate() { return plantingDate; }
    public void setPlantingDate(LocalDate plantingDate) { this.plantingDate = plantingDate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }

    public String getIrrigationType() { return irrigationType; }
    public void setIrrigationType(String irrigationType) { this.irrigationType = irrigationType; }

    public String getPreviousDiseases() { return previousDiseases; }
    public void setPreviousDiseases(String previousDiseases) { this.previousDiseases = previousDiseases; }

    public String getTreatmentsApplied() { return treatmentsApplied; }
    public void setTreatmentsApplied(String treatmentsApplied) { this.treatmentsApplied = treatmentsApplied; }
}
