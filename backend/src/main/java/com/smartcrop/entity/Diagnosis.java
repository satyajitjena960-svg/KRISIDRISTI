package com.smartcrop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "diagnoses")
public class Diagnosis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long farmerId;
    private Long farmPlotId;

    @Column(nullable = false)
    private String cropType;

    @Column(nullable = false)
    private String diseaseName;

    private String scientificName;
    private Double confidenceScore; // e.g. 93.4 (%)
    private Double severityPercentage; // e.g. 62.0 (%)
    private String severityLevel; // MILD, MODERATE, SEVERE

    @Column(columnDefinition = "TEXT")
    private String symptoms; // JSON or comma-delimited

    @Column(columnDefinition = "TEXT")
    private String possibleCauses;

    @Column(columnDefinition = "TEXT")
    private String biologicalControl;

    @Column(columnDefinition = "TEXT")
    private String chemicalControl;

    @Column(columnDefinition = "TEXT")
    private String preventiveMeasures;

    @Column(columnDefinition = "TEXT")
    private String safetyDisclaimer;

    private String imageUrl;
    private LocalDateTime diagnosisDate;
    private LocalDateTime followUpDueDate;

    private String status; // ACTIVE, FOLLOW_UP_DUE, RESOLVED, ESCALATED
    private Boolean isEscalated; // For low confidence or severe outbreak

    @Column(columnDefinition = "TEXT")
    private String expertNotes;

    private String district;
    private String village;

    public Diagnosis() {
        this.diagnosisDate = LocalDateTime.now();
        this.followUpDueDate = LocalDateTime.now().plusDays(5);
        this.isEscalated = false;
        this.status = "ACTIVE";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }

    public Long getFarmPlotId() { return farmPlotId; }
    public void setFarmPlotId(Long farmPlotId) { this.farmPlotId = farmPlotId; }

    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }

    public String getDiseaseName() { return diseaseName; }
    public void setDiseaseName(String diseaseName) { this.diseaseName = diseaseName; }

    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }

    public Double getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(Double confidenceScore) { this.confidenceScore = confidenceScore; }

    public Double getSeverityPercentage() { return severityPercentage; }
    public void setSeverityPercentage(Double severityPercentage) { this.severityPercentage = severityPercentage; }

    public String getSeverityLevel() { return severityLevel; }
    public void setSeverityLevel(String severityLevel) { this.severityLevel = severityLevel; }

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }

    public String getPossibleCauses() { return possibleCauses; }
    public void setPossibleCauses(String possibleCauses) { this.possibleCauses = possibleCauses; }

    public String getBiologicalControl() { return biologicalControl; }
    public void setBiologicalControl(String biologicalControl) { this.biologicalControl = biologicalControl; }

    public String getChemicalControl() { return chemicalControl; }
    public void setChemicalControl(String chemicalControl) { this.chemicalControl = chemicalControl; }

    public String getPreventiveMeasures() { return preventiveMeasures; }
    public void setPreventiveMeasures(String preventiveMeasures) { this.preventiveMeasures = preventiveMeasures; }

    public String getSafetyDisclaimer() { return safetyDisclaimer; }
    public void setSafetyDisclaimer(String safetyDisclaimer) { this.safetyDisclaimer = safetyDisclaimer; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public LocalDateTime getDiagnosisDate() { return diagnosisDate; }
    public void setDiagnosisDate(LocalDateTime diagnosisDate) { this.diagnosisDate = diagnosisDate; }

    public LocalDateTime getFollowUpDueDate() { return followUpDueDate; }
    public void setFollowUpDueDate(LocalDateTime followUpDueDate) { this.followUpDueDate = followUpDueDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Boolean getIsEscalated() { return isEscalated; }
    public void setIsEscalated(Boolean isEscalated) { this.isEscalated = isEscalated; }

    public String getExpertNotes() { return expertNotes; }
    public void setExpertNotes(String expertNotes) { this.expertNotes = expertNotes; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }
}
