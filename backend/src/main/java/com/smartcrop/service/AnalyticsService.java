package com.smartcrop.service;

import com.smartcrop.dto.AnalyticsDashboardDto;
import com.smartcrop.repository.DiagnosisRepository;
import com.smartcrop.repository.FarmerRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnalyticsService {

    private final DiagnosisRepository diagnosisRepository;
    private final FarmerRepository farmerRepository;

    public AnalyticsService(DiagnosisRepository diagnosisRepository, FarmerRepository farmerRepository) {
        this.diagnosisRepository = diagnosisRepository;
        this.farmerRepository = farmerRepository;
    }

    public AnalyticsDashboardDto getDashboardKpis() {
        AnalyticsDashboardDto dto = new AnalyticsDashboardDto();

        long dbFarmers = farmerRepository.count();
        long dbDiagnoses = diagnosisRepository.count();

        // Populate realistic organizational analytics seeded with the numbers in user's prompt
        dto.setTotalFarmers(Math.max(2540L, dbFarmers));
        dto.setTotalDiseaseCases(Math.max(1284L, dbDiagnoses));
        dto.setMostReportedDisease("Tomato Early Blight");
        dto.setHighRiskRegion("Cuttack");
        dto.setCasesThisWeekGrowthPercent(18.0);
        dto.setExpertReviewsCompleted(347L);
        dto.setPendingEscalations(14L);
        dto.setTreatmentSuccessRatePercent(78.5);

        // Disease Frequency chart data
        List<Map<String, Object>> diseaseFreq = new ArrayList<>();
        diseaseFreq.add(Map.of("name", "Tomato Early Blight", "count", 485, "percentage", 37.8));
        diseaseFreq.add(Map.of("name", "Rice Blast", "count", 342, "percentage", 26.6));
        diseaseFreq.add(Map.of("name", "Potato Late Blight", "count", 256, "percentage", 19.9));
        diseaseFreq.add(Map.of("name", "Chili Leaf Curl", "count", 128, "percentage", 10.0));
        diseaseFreq.add(Map.of("name", "Bacterial Wilt", "count", 73, "percentage", 5.7));
        dto.setDiseaseFrequency(diseaseFreq);

        // Crop-wise Cases chart data
        List<Map<String, Object>> cropWise = new ArrayList<>();
        cropWise.add(Map.of("crop", "Tomato", "cases", 512, "acresAffected", 640));
        cropWise.add(Map.of("crop", "Rice / Paddy", "cases", 380, "acresAffected", 1250));
        cropWise.add(Map.of("crop", "Potato", "cases", 270, "acresAffected", 410));
        cropWise.add(Map.of("crop", "Chili", "cases", 122, "acresAffected", 180));
        dto.setCropWiseCases(cropWise);

        // Region-wise Cases (Odisha districts)
        List<Map<String, Object>> regionWise = new ArrayList<>();
        regionWise.add(Map.of("district", "Cuttack", "cases", 37, "status", "HIGH RISK (Outbreak Warning)"));
        regionWise.add(Map.of("district", "Khordha", "cases", 12, "status", "WATCH"));
        regionWise.add(Map.of("district", "Balasore", "cases", 18, "status", "WATCH"));
        regionWise.add(Map.of("district", "Puri", "cases", 5, "status", "LOW"));
        regionWise.add(Map.of("district", "Ganjam", "cases", 9, "status", "LOW"));
        regionWise.add(Map.of("district", "Sambalpur", "cases", 14, "status", "WATCH"));
        dto.setRegionWiseCases(regionWise);

        // Monthly trends (incidence vs recovery)
        List<Map<String, Object>> monthly = new ArrayList<>();
        monthly.add(Map.of("month", "April", "cases", 180, "recovered", 145));
        monthly.add(Map.of("month", "May", "cases", 210, "recovered", 170));
        monthly.add(Map.of("month", "June", "cases", 310, "recovered", 240));
        monthly.add(Map.of("month", "July", "cases", 380, "recovered", 295));
        monthly.add(Map.of("month", "August", "cases", 420, "recovered", 340));
        monthly.add(Map.of("month", "September", "cases", 460, "recovered", 385));
        dto.setMonthlyTrends(monthly);

        return dto;
    }
}
