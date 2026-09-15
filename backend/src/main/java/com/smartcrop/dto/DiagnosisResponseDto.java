package com.smartcrop.dto;

import java.time.LocalDateTime;
import java.util.List;

public class DiagnosisResponseDto {
    private Long id;
    private Long farmerId;
    private Long farmPlotId;
    private String cropType;
    private String diseaseName;
    private String scientificName;
    private Double confidenceScore;
    private Double severityPercentage;
    private String severityLevel;
    private List<String> symptoms;
    private List<String> possibleCauses;
    private List<String> biologicalControl;
    private List<String> chemicalControl;
    private List<String> preventiveMeasures;
    private String safetyDisclaimer;
    private String imageUrl;
    private LocalDateTime diagnosisDate;
    private LocalDateTime followUpDueDate;
    private String status;
    private Boolean isEscalated;
    private String expertNotes;
    private String district;

    public DiagnosisResponseDto() {}

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

    public List<String> getSymptoms() { return symptoms; }
    public void setSymptoms(List<String> symptoms) { this.symptoms = symptoms; }

    public List<String> getPossibleCauses() { return possibleCauses; }
    public void setPossibleCauses(List<String> possibleCauses) { this.possibleCauses = possibleCauses; }

    public List<String> getBiologicalControl() { return biologicalControl; }
    public void setBiologicalControl(List<String> biologicalControl) { this.biologicalControl = biologicalControl; }

    public List<String> getChemicalControl() { return chemicalControl; }
    public void setChemicalControl(List<String> chemicalControl) { this.chemicalControl = chemicalControl; }

    public List<String> getPreventiveMeasures() { return preventiveMeasures; }
    public void setPreventiveMeasures(List<String> preventiveMeasures) { this.preventiveMeasures = preventiveMeasures; }

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
}
