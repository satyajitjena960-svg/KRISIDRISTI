package com.smartcrop.service;

import com.smartcrop.entity.OutbreakRecord;
import com.smartcrop.repository.OutbreakRecordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class OutbreakService {

    private final OutbreakRecordRepository outbreakRepository;

    public OutbreakService(OutbreakRecordRepository outbreakRepository) {
        this.outbreakRepository = outbreakRepository;
    }

    public List<OutbreakRecord> getOutbreaksByState(String state) {
        String targetState = state != null && !state.isBlank() ? state : "Odisha";
        return outbreakRepository.findByStateOrderByReportedCasesDesc(targetState);
    }

    public OutbreakRecord recordOrUpdateCase(String state, String district, String disease, String crop) {
        Optional<OutbreakRecord> existing = outbreakRepository.findByDistrictAndPrimaryDisease(district, disease);
        OutbreakRecord record;
        if (existing.isPresent()) {
            record = existing.get();
            record.setReportedCases(record.getReportedCases() + 1);
        } else {
            record = new OutbreakRecord(
                    state, district, disease, crop, 1, "NORMAL",
                    getDistrictLat(district), getDistrictLng(district)
            );
        }

        // Outbreak threshold evaluation
        if (record.getReportedCases() >= 25) {
            record.setAlertLevel("OUTBREAK_WARNING");
        } else if (record.getReportedCases() >= 10) {
            record.setAlertLevel("WATCH");
        } else {
            record.setAlertLevel("NORMAL");
        }

        record.setLastUpdated(LocalDateTime.now());
        return outbreakRepository.save(record);
    }

    private double getDistrictLat(String district) {
        return switch (district.toLowerCase()) {
            case "cuttack" -> 20.4625;
            case "khordha" -> 20.1818;
            case "puri" -> 19.8135;
            case "balasore" -> 21.4934;
            case "ganjam" -> 19.3800;
            case "sambalpur" -> 21.4669;
            default -> 20.2961; // Bhubaneswar
        };
    }

    private double getDistrictLng(String district) {
        return switch (district.toLowerCase()) {
            case "cuttack" -> 85.8828;
            case "khordha" -> 85.6214;
            case "puri" -> 85.8312;
            case "balasore" -> 86.9135;
            case "ganjam" -> 84.8700;
            case "sambalpur" -> 83.9812;
            default -> 85.8245;
        };
    }
}
