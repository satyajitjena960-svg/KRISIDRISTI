package com.smartcrop.dto;

import java.util.List;
import java.util.Map;

public class AnalyticsDashboardDto {
    private Long totalFarmers;
    private Long totalDiseaseCases;
    private String mostReportedDisease;
    private String highRiskRegion;
    private Double casesThisWeekGrowthPercent;
    private Long expertReviewsCompleted;
    private Long pendingEscalations;
    private Double treatmentSuccessRatePercent;

    private List<Map<String, Object>> diseaseFrequency;
    private List<Map<String, Object>> cropWiseCases;
    private List<Map<String, Object>> regionWiseCases;
    private List<Map<String, Object>> monthlyTrends;

    public AnalyticsDashboardDto() {}

    public Long getTotalFarmers() { return totalFarmers; }
    public void setTotalFarmers(Long totalFarmers) { this.totalFarmers = totalFarmers; }

    public Long getTotalDiseaseCases() { return totalDiseaseCases; }
    public void setTotalDiseaseCases(Long totalDiseaseCases) { this.totalDiseaseCases = totalDiseaseCases; }

    public String getMostReportedDisease() { return mostReportedDisease; }
    public void setMostReportedDisease(String mostReportedDisease) { this.mostReportedDisease = mostReportedDisease; }

    public String getHighRiskRegion() { return highRiskRegion; }
    public void setHighRiskRegion(String highRiskRegion) { this.highRiskRegion = highRiskRegion; }

    public Double getCasesThisWeekGrowthPercent() { return casesThisWeekGrowthPercent; }
    public void setCasesThisWeekGrowthPercent(Double casesThisWeekGrowthPercent) { this.casesThisWeekGrowthPercent = casesThisWeekGrowthPercent; }

    public Long getExpertReviewsCompleted() { return expertReviewsCompleted; }
    public void setExpertReviewsCompleted(Long expertReviewsCompleted) { this.expertReviewsCompleted = expertReviewsCompleted; }

    public Long getPendingEscalations() { return pendingEscalations; }
    public void setPendingEscalations(Long pendingEscalations) { this.pendingEscalations = pendingEscalations; }

    public Double getTreatmentSuccessRatePercent() { return treatmentSuccessRatePercent; }
    public void setTreatmentSuccessRatePercent(Double treatmentSuccessRatePercent) { this.treatmentSuccessRatePercent = treatmentSuccessRatePercent; }

    public List<Map<String, Object>> getDiseaseFrequency() { return diseaseFrequency; }
    public void setDiseaseFrequency(List<Map<String, Object>> diseaseFrequency) { this.diseaseFrequency = diseaseFrequency; }

    public List<Map<String, Object>> getCropWiseCases() { return cropWiseCases; }
    public void setCropWiseCases(List<Map<String, Object>> cropWiseCases) { this.cropWiseCases = cropWiseCases; }

    public List<Map<String, Object>> getRegionWiseCases() { return regionWiseCases; }
    public void setRegionWiseCases(List<Map<String, Object>> regionWiseCases) { this.regionWiseCases = regionWiseCases; }

    public List<Map<String, Object>> getMonthlyTrends() { return monthlyTrends; }
    public void setMonthlyTrends(List<Map<String, Object>> monthlyTrends) { this.monthlyTrends = monthlyTrends; }
}
