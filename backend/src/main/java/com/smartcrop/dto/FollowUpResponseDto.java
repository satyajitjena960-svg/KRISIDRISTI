package com.smartcrop.dto;

import java.time.LocalDateTime;

public class FollowUpResponseDto {
    private Long id;
    private Long diagnosisId;
    private String diseaseName;
    private String cropType;
    private LocalDateTime followUpDate;
    private Double previousSeverity;
    private Double currentSeverity;
    private Double severityChangePercent;
    private String conditionStatus; // IMPROVING, STABLE, WORSENING
    private String treatmentApplied;
    private String farmerObservations;
    private String followUpImageUrl;

    public FollowUpResponseDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getDiagnosisId() { return diagnosisId; }
    public void setDiagnosisId(Long diagnosisId) { this.diagnosisId = diagnosisId; }

    public String getDiseaseName() { return diseaseName; }
    public void setDiseaseName(String diseaseName) { this.diseaseName = diseaseName; }

    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }

    public LocalDateTime getFollowUpDate() { return followUpDate; }
    public void setFollowUpDate(LocalDateTime followUpDate) { this.followUpDate = followUpDate; }

    public Double getPreviousSeverity() { return previousSeverity; }
    public void setPreviousSeverity(Double previousSeverity) { this.previousSeverity = previousSeverity; }

    public Double getCurrentSeverity() { return currentSeverity; }
    public void setCurrentSeverity(Double currentSeverity) { this.currentSeverity = currentSeverity; }

    public Double getSeverityChangePercent() { return severityChangePercent; }
    public void setSeverityChangePercent(Double severityChangePercent) { this.severityChangePercent = severityChangePercent; }

    public String getConditionStatus() { return conditionStatus; }
    public void setConditionStatus(String conditionStatus) { this.conditionStatus = conditionStatus; }

    public String getTreatmentApplied() { return treatmentApplied; }
    public void setTreatmentApplied(String treatmentApplied) { this.treatmentApplied = treatmentApplied; }

    public String getFarmerObservations() { return farmerObservations; }
    public void setFarmerObservations(String farmerObservations) { this.farmerObservations = farmerObservations; }

    public String getFollowUpImageUrl() { return followUpImageUrl; }
    public void setFollowUpImageUrl(String followUpImageUrl) { this.followUpImageUrl = followUpImageUrl; }
}
