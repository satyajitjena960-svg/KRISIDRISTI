package com.smartcrop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "follow_up_records")
public class FollowUpRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long diagnosisId;

    private Long farmerId;
    private LocalDateTime followUpDate;

    private Double previousSeverity; // e.g. 62.0
    private Double currentSeverity;  // e.g. 38.0
    private Double severityChangePercent; // e.g. -24.0

    private String conditionStatus; // IMPROVING, STABLE, WORSENING
    private String treatmentApplied; // e.g. "Sprayed Trichoderma viride bio-fungicide"

    @Column(columnDefinition = "TEXT")
    private String farmerObservations;

    private String followUpImageUrl;

    public FollowUpRecord() {
        this.followUpDate = LocalDateTime.now();
    }

    public FollowUpRecord(Long diagnosisId, Long farmerId, Double previousSeverity, Double currentSeverity,
                          String treatmentApplied, String farmerObservations, String followUpImageUrl) {
        this.diagnosisId = diagnosisId;
        this.farmerId = farmerId;
        this.previousSeverity = previousSeverity;
        this.currentSeverity = currentSeverity;
        this.severityChangePercent = currentSeverity - previousSeverity; // negative means reduction/improvement
        if (this.severityChangePercent < -5.0) {
            this.conditionStatus = "IMPROVING";
        } else if (this.severityChangePercent > 5.0) {
            this.conditionStatus = "WORSENING";
        } else {
            this.conditionStatus = "STABLE";
        }
        this.treatmentApplied = treatmentApplied;
        this.farmerObservations = farmerObservations;
        this.followUpImageUrl = followUpImageUrl;
        this.followUpDate = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getDiagnosisId() { return diagnosisId; }
    public void setDiagnosisId(Long diagnosisId) { this.diagnosisId = diagnosisId; }

    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }

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
