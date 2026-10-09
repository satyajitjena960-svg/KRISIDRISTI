package com.krishisathi.crop.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "crop_disease_diagnoses")
public class CropDiseaseDiagnosis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String farmerPhone;

    @Column(nullable = false, length = 60)
    private String cropName;

    @Column(nullable = false, length = 100)
    private String diseaseName;

    @Column(nullable = false, length = 100)
    private String diseaseHindiName;

    private Double confidencePercentage;

    @Column(length = 20)
    private String severity; // LOW, MODERATE, CRITICAL

    @Column(length = 1000)
    private String symptomsDescription;

    @Column(length = 1000)
    private String chemicalSolution;

    @Column(length = 1000)
    private String organicSolution;

    @Column(length = 1000)
    private String audioSummaryHindi;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String imagePreview;

    private Double healthyTissuePercentage;
    private Double affectedAreaPercentage;
    private String dominantAnomaly;

    private LocalDateTime diagnosedAt = LocalDateTime.now();

    public CropDiseaseDiagnosis() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFarmerPhone() { return farmerPhone; }
    public void setFarmerPhone(String farmerPhone) { this.farmerPhone = farmerPhone; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public String getDiseaseName() { return diseaseName; }
    public void setDiseaseName(String diseaseName) { this.diseaseName = diseaseName; }
    public String getDiseaseHindiName() { return diseaseHindiName; }
    public void setDiseaseHindiName(String diseaseHindiName) { this.diseaseHindiName = diseaseHindiName; }
    public Double getConfidencePercentage() { return confidencePercentage; }
    public void setConfidencePercentage(Double confidencePercentage) { this.confidencePercentage = confidencePercentage; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public String getSymptomsDescription() { return symptomsDescription; }
    public void setSymptomsDescription(String symptomsDescription) { this.symptomsDescription = symptomsDescription; }
    public String getChemicalSolution() { return chemicalSolution; }
    public void setChemicalSolution(String chemicalSolution) { this.chemicalSolution = chemicalSolution; }
    public String getOrganicSolution() { return organicSolution; }
    public void setOrganicSolution(String organicSolution) { this.organicSolution = organicSolution; }
    public String getAudioSummaryHindi() { return audioSummaryHindi; }
    public void setAudioSummaryHindi(String audioSummaryHindi) { this.audioSummaryHindi = audioSummaryHindi; }
    public String getImagePreview() { return imagePreview; }
    public void setImagePreview(String imagePreview) { this.imagePreview = imagePreview; }
    public Double getHealthyTissuePercentage() { return healthyTissuePercentage; }
    public void setHealthyTissuePercentage(Double healthyTissuePercentage) { this.healthyTissuePercentage = healthyTissuePercentage; }
    public Double getAffectedAreaPercentage() { return affectedAreaPercentage; }
    public void setAffectedAreaPercentage(Double affectedAreaPercentage) { this.affectedAreaPercentage = affectedAreaPercentage; }
    public String getDominantAnomaly() { return dominantAnomaly; }
    public void setDominantAnomaly(String dominantAnomaly) { this.dominantAnomaly = dominantAnomaly; }
    public LocalDateTime getDiagnosedAt() { return diagnosedAt; }
    public void setDiagnosedAt(LocalDateTime diagnosedAt) { this.diagnosedAt = diagnosedAt; }
}
