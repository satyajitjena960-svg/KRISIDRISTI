package com.smartcrop.dto;

import java.time.LocalDateTime;

public class FollowUpRequestDto {
    private Long diagnosisId;
    private Long farmerId;
    private String treatmentApplied;
    private String farmerObservations;
    private String imageBase64;

    public FollowUpRequestDto() {}

    public Long getDiagnosisId() { return diagnosisId; }
    public void setDiagnosisId(Long diagnosisId) { this.diagnosisId = diagnosisId; }

    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }

    public String getTreatmentApplied() { return treatmentApplied; }
    public void setTreatmentApplied(String treatmentApplied) { this.treatmentApplied = treatmentApplied; }

    public String getFarmerObservations() { return farmerObservations; }
    public void setFarmerObservations(String farmerObservations) { this.farmerObservations = farmerObservations; }

    public String getImageBase64() { return imageBase64; }
    public void setImageBase64(String imageBase64) { this.imageBase64 = imageBase64; }
}
