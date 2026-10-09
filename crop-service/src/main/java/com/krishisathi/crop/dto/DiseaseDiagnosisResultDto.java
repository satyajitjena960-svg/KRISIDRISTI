package com.krishisathi.crop.dto;

import java.util.List;

public class DiseaseDiagnosisResultDto {
    private Long id;
    private String cropName;
    private String diseaseName;
    private String diseaseHindiName;
    private double confidencePercentage;
    private String severity; // LOW, MODERATE, CRITICAL
    private String symptomsDescription;
    private String symptomsHindiDescription;
    private String chemicalSolution;
    private String chemicalDosage;
    private String organicSolution;
    private List<String> preventionTips;
    private String audioSummaryHindi;
    private String audioSummaryEnglish;
    private String imagePreview;

    // Real-time Computer Vision & Spectrum Telemetry
    private Double healthyTissuePercentage;
    private Double affectedAreaPercentage;
    private String dominantAnomaly;
    private String imageResolution;
    private Long analyzedPixelsCount;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public String getDiseaseName() { return diseaseName; }
    public void setDiseaseName(String diseaseName) { this.diseaseName = diseaseName; }
    public String getDiseaseHindiName() { return diseaseHindiName; }
    public void setDiseaseHindiName(String diseaseHindiName) { this.diseaseHindiName = diseaseHindiName; }
    public double getConfidencePercentage() { return confidencePercentage; }
    public void setConfidencePercentage(double confidencePercentage) { this.confidencePercentage = confidencePercentage; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public String getSymptomsDescription() { return symptomsDescription; }
    public void setSymptomsDescription(String symptomsDescription) { this.symptomsDescription = symptomsDescription; }
    public String getSymptomsHindiDescription() { return symptomsHindiDescription; }
    public void setSymptomsHindiDescription(String symptomsHindiDescription) { this.symptomsHindiDescription = symptomsHindiDescription; }
    public String getChemicalSolution() { return chemicalSolution; }
    public void setChemicalSolution(String chemicalSolution) { this.chemicalSolution = chemicalSolution; }
    public String getChemicalDosage() { return chemicalDosage; }
    public void setChemicalDosage(String chemicalDosage) { this.chemicalDosage = chemicalDosage; }
    public String getOrganicSolution() { return organicSolution; }
    public void setOrganicSolution(String organicSolution) { this.organicSolution = organicSolution; }
    public List<String> getPreventionTips() { return preventionTips; }
    public void setPreventionTips(List<String> preventionTips) { this.preventionTips = preventionTips; }
    public String getAudioSummaryHindi() { return audioSummaryHindi; }
    public void setAudioSummaryHindi(String audioSummaryHindi) { this.audioSummaryHindi = audioSummaryHindi; }
    public String getAudioSummaryEnglish() { return audioSummaryEnglish; }
    public void setAudioSummaryEnglish(String audioSummaryEnglish) { this.audioSummaryEnglish = audioSummaryEnglish; }
    public String getImagePreview() { return imagePreview; }
    public void setImagePreview(String imagePreview) { this.imagePreview = imagePreview; }

    public Double getHealthyTissuePercentage() { return healthyTissuePercentage; }
    public void setHealthyTissuePercentage(Double healthyTissuePercentage) { this.healthyTissuePercentage = healthyTissuePercentage; }
    public Double getAffectedAreaPercentage() { return affectedAreaPercentage; }
    public void setAffectedAreaPercentage(Double affectedAreaPercentage) { this.affectedAreaPercentage = affectedAreaPercentage; }
    public String getDominantAnomaly() { return dominantAnomaly; }
    public void setDominantAnomaly(String dominantAnomaly) { this.dominantAnomaly = dominantAnomaly; }
    public String getImageResolution() { return imageResolution; }
    public void setImageResolution(String imageResolution) { this.imageResolution = imageResolution; }
    public Long getAnalyzedPixelsCount() { return analyzedPixelsCount; }
    public void setAnalyzedPixelsCount(Long analyzedPixelsCount) { this.analyzedPixelsCount = analyzedPixelsCount; }
}
