package com.krishisathi.crop.dto;

import java.time.LocalDate;
import java.util.List;

public class CropGuidanceDto {
    private Long cropId;
    private String cropName;
    private String variety;
    private LocalDate sowingDate;
    private long daysSinceSowing;
    private Double landAreaAcres;
    private String currentStage; // "Sowing", "Crown Root Initiation", "Tillering", "Jointing", "Flowering", "Maturity"
    private int stageProgressPercentage;
    private String nextIrrigationDate;
    private String irrigationStatus;
    private List<DailyTask> dailyTasks;
    private FertilizerRecommendation fertilizerRecommendation;
    private String audioGuidanceSummaryHindi;
    private String audioGuidanceSummaryEnglish;

    public static class DailyTask {
        private String title;
        private String titleHindi;
        private String priority; // HIGH, MEDIUM, NORMAL
        private String description;

        public DailyTask() {}
        public DailyTask(String title, String titleHindi, String priority, String description) {
            this.title = title;
            this.titleHindi = titleHindi;
            this.priority = priority;
            this.description = description;
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getTitleHindi() { return titleHindi; }
        public void setTitleHindi(String titleHindi) { this.titleHindi = titleHindi; }
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    public static class FertilizerRecommendation {
        private String name;
        private String dosePerAcre;
        private String totalDoseRequired;
        private String applicationTiming;
        private String precautions;

        public FertilizerRecommendation() {}
        public FertilizerRecommendation(String name, String dosePerAcre, String totalDoseRequired, String applicationTiming, String precautions) {
            this.name = name;
            this.dosePerAcre = dosePerAcre;
            this.totalDoseRequired = totalDoseRequired;
            this.applicationTiming = applicationTiming;
            this.precautions = precautions;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDosePerAcre() { return dosePerAcre; }
        public void setDosePerAcre(String dosePerAcre) { this.dosePerAcre = dosePerAcre; }
        public String getTotalDoseRequired() { return totalDoseRequired; }
        public void setTotalDoseRequired(String totalDoseRequired) { this.totalDoseRequired = totalDoseRequired; }
        public String getApplicationTiming() { return applicationTiming; }
        public void setApplicationTiming(String applicationTiming) { this.applicationTiming = applicationTiming; }
        public String getPrecautions() { return precautions; }
        public void setPrecautions(String precautions) { this.precautions = precautions; }
    }

    public Long getCropId() { return cropId; }
    public void setCropId(Long cropId) { this.cropId = cropId; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public String getVariety() { return variety; }
    public void setVariety(String variety) { this.variety = variety; }
    public LocalDate getSowingDate() { return sowingDate; }
    public void setSowingDate(LocalDate sowingDate) { this.sowingDate = sowingDate; }
    public long getDaysSinceSowing() { return daysSinceSowing; }
    public void setDaysSinceSowing(long daysSinceSowing) { this.daysSinceSowing = daysSinceSowing; }
    public Double getLandAreaAcres() { return landAreaAcres; }
    public void setLandAreaAcres(Double landAreaAcres) { this.landAreaAcres = landAreaAcres; }
    public String getCurrentStage() { return currentStage; }
    public void setCurrentStage(String currentStage) { this.currentStage = currentStage; }
    public int getStageProgressPercentage() { return stageProgressPercentage; }
    public void setStageProgressPercentage(int stageProgressPercentage) { this.stageProgressPercentage = stageProgressPercentage; }
    public String getNextIrrigationDate() { return nextIrrigationDate; }
    public void setNextIrrigationDate(String nextIrrigationDate) { this.nextIrrigationDate = nextIrrigationDate; }
    public String getIrrigationStatus() { return irrigationStatus; }
    public void setIrrigationStatus(String irrigationStatus) { this.irrigationStatus = irrigationStatus; }
    public List<DailyTask> getDailyTasks() { return dailyTasks; }
    public void setDailyTasks(List<DailyTask> dailyTasks) { this.dailyTasks = dailyTasks; }
    public FertilizerRecommendation getFertilizerRecommendation() { return fertilizerRecommendation; }
    public void setFertilizerRecommendation(FertilizerRecommendation fertilizerRecommendation) { this.fertilizerRecommendation = fertilizerRecommendation; }
    public String getAudioGuidanceSummaryHindi() { return audioGuidanceSummaryHindi; }
    public void setAudioGuidanceSummaryHindi(String audioGuidanceSummaryHindi) { this.audioGuidanceSummaryHindi = audioGuidanceSummaryHindi; }
    public String getAudioGuidanceSummaryEnglish() { return audioGuidanceSummaryEnglish; }
    public void setAudioGuidanceSummaryEnglish(String audioGuidanceSummaryEnglish) { this.audioGuidanceSummaryEnglish = audioGuidanceSummaryEnglish; }
}
