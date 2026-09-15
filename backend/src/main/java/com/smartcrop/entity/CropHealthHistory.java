package com.smartcrop.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "crop_health_histories")
public class CropHealthHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long farmPlotId;

    private String cropName; // Tomato, Rice, Potato
    private LocalDate checkDate;
    private String healthStage; // "Healthy", "Early symptoms", "Moderate disease", "Improving", "Healthy"
    private Double severityPercent;
    private String symptomsObserved;
    private String imageUrl;
    private String actionsTaken;

    public CropHealthHistory() {}

    public CropHealthHistory(Long farmPlotId, String cropName, LocalDate checkDate, String healthStage,
                             Double severityPercent, String symptomsObserved, String imageUrl, String actionsTaken) {
        this.farmPlotId = farmPlotId;
        this.cropName = cropName;
        this.checkDate = checkDate;
        this.healthStage = healthStage;
        this.severityPercent = severityPercent;
        this.symptomsObserved = symptomsObserved;
        this.imageUrl = imageUrl;
        this.actionsTaken = actionsTaken;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getFarmPlotId() { return farmPlotId; }
    public void setFarmPlotId(Long farmPlotId) { this.farmPlotId = farmPlotId; }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public LocalDate getCheckDate() { return checkDate; }
    public void setCheckDate(LocalDate checkDate) { this.checkDate = checkDate; }

    public String getHealthStage() { return healthStage; }
    public void setHealthStage(String healthStage) { this.healthStage = healthStage; }

    public Double getSeverityPercent() { return severityPercent; }
    public void setSeverityPercent(Double severityPercent) { this.severityPercent = severityPercent; }

    public String getSymptomsObserved() { return symptomsObserved; }
    public void setSymptomsObserved(String symptomsObserved) { this.symptomsObserved = symptomsObserved; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getActionsTaken() { return actionsTaken; }
    public void setActionsTaken(String actionsTaken) { this.actionsTaken = actionsTaken; }
}
