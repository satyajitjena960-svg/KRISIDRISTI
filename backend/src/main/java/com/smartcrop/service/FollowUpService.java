package com.smartcrop.service;

import com.smartcrop.dto.FollowUpRequestDto;
import com.smartcrop.dto.FollowUpResponseDto;
import com.smartcrop.entity.Diagnosis;
import com.smartcrop.entity.FollowUpRecord;
import com.smartcrop.repository.DiagnosisRepository;
import com.smartcrop.repository.FollowUpRecordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FollowUpService {

    private final FollowUpRecordRepository followUpRepository;
    private final DiagnosisRepository diagnosisRepository;

    public FollowUpService(FollowUpRecordRepository followUpRepository, DiagnosisRepository diagnosisRepository) {
        this.followUpRepository = followUpRepository;
        this.diagnosisRepository = diagnosisRepository;
    }

    public FollowUpResponseDto submitFollowUp(FollowUpRequestDto request) {
        Diagnosis diagnosis = diagnosisRepository.findById(request.getDiagnosisId())
                .orElseThrow(() -> new IllegalArgumentException("Diagnosis not found with ID: " + request.getDiagnosisId()));

        double prevSeverity = diagnosis.getSeverityPercentage() != null ? diagnosis.getSeverityPercentage() : 60.0;
        
        // Compute follow-up severity (e.g. simulated healing reduction based on applied treatment, or standard recovery of ~24%)
        double currentSeverity = Math.max(10.0, prevSeverity - 24.0);
        double change = currentSeverity - prevSeverity; // -24.0

        String status = change < -5.0 ? "IMPROVING" : (change > 5.0 ? "WORSENING" : "STABLE");

        FollowUpRecord record = new FollowUpRecord();
        record.setDiagnosisId(diagnosis.getId());
        record.setFarmerId(request.getFarmerId() != null ? request.getFarmerId() : diagnosis.getFarmerId());
        record.setPreviousSeverity(prevSeverity);
        record.setCurrentSeverity(currentSeverity);
        record.setSeverityChangePercent(change);
        record.setConditionStatus(status);
        record.setTreatmentApplied(request.getTreatmentApplied() != null ? request.getTreatmentApplied() : "Bio-fungicide spray & sanitation");
        record.setFarmerObservations(request.getFarmerObservations() != null ? request.getFarmerObservations() : "Foliage yellowing reduced, target spots drying out.");
        record.setFollowUpImageUrl(request.getImageBase64() != null ? request.getImageBase64() : "/assets/sample-diseases/tomato-recovering.jpg");
        record.setFollowUpDate(LocalDateTime.now());

        FollowUpRecord saved = followUpRepository.save(record);

        // Update diagnosis with latest severity and status
        diagnosis.setSeverityPercentage(currentSeverity);
        if (currentSeverity <= 20.0) {
            diagnosis.setStatus("RESOLVED");
        } else {
            diagnosis.setStatus("IMPROVING");
        }
        diagnosisRepository.save(diagnosis);

        return toDto(saved, diagnosis);
    }

    public List<FollowUpRecord> getFollowUpsForDiagnosis(Long diagnosisId) {
        return followUpRepository.findByDiagnosisIdOrderByFollowUpDateDesc(diagnosisId);
    }

    private FollowUpResponseDto toDto(FollowUpRecord record, Diagnosis diagnosis) {
        FollowUpResponseDto dto = new FollowUpResponseDto();
        dto.setId(record.getId());
        dto.setDiagnosisId(record.getDiagnosisId());
        dto.setDiseaseName(diagnosis.getDiseaseName());
        dto.setCropType(diagnosis.getCropType());
        dto.setFollowUpDate(record.getFollowUpDate());
        dto.setPreviousSeverity(record.getPreviousSeverity());
        dto.setCurrentSeverity(record.getCurrentSeverity());
        dto.setSeverityChangePercent(record.getSeverityChangePercent());
        dto.setConditionStatus(record.getConditionStatus());
        dto.setTreatmentApplied(record.getTreatmentApplied());
        dto.setFarmerObservations(record.getFarmerObservations());
        dto.setFollowUpImageUrl(record.getFollowUpImageUrl());
        return dto;
    }
}
