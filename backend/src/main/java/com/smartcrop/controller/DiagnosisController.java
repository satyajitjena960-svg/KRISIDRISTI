package com.smartcrop.controller;

import com.smartcrop.dto.DiagnosisRequestDto;
import com.smartcrop.dto.DiagnosisResponseDto;
import com.smartcrop.dto.EscalationReviewDto;
import com.smartcrop.entity.Diagnosis;
import com.smartcrop.repository.DiagnosisRepository;
import com.smartcrop.service.AiDiagnosisService;
import com.smartcrop.service.OutbreakService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/diagnoses")
public class DiagnosisController {

    private final AiDiagnosisService diagnosisService;
    private final DiagnosisRepository diagnosisRepository;
    private final OutbreakService outbreakService;

    public DiagnosisController(AiDiagnosisService diagnosisService,
                               DiagnosisRepository diagnosisRepository,
                               OutbreakService outbreakService) {
        this.diagnosisService = diagnosisService;
        this.diagnosisRepository = diagnosisRepository;
        this.outbreakService = outbreakService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<DiagnosisResponseDto> analyzeCrop(@RequestBody DiagnosisRequestDto request) {
        DiagnosisResponseDto result = diagnosisService.diagnose(request);
        // Automatically aggregate into regional outbreak monitoring
        if (result.getDistrict() != null && result.getDiseaseName() != null) {
            outbreakService.recordOrUpdateCase("Odisha", result.getDistrict(), result.getDiseaseName(), result.getCropType());
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiagnosisResponseDto> getDiagnosis(@PathVariable Long id) {
        return diagnosisRepository.findById(id)
                .map(diagnosisService::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<DiagnosisResponseDto>> getDiagnosesByFarmer(@PathVariable Long farmerId) {
        List<DiagnosisResponseDto> list = diagnosisRepository.findByFarmerIdOrderByDiagnosisDateDesc(farmerId)
                .stream()
                .map(diagnosisService::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/escalated")
    public ResponseEntity<List<DiagnosisResponseDto>> getEscalatedCases() {
        List<DiagnosisResponseDto> list = diagnosisRepository.findByIsEscalatedTrueOrderByDiagnosisDateDesc()
                .stream()
                .map(diagnosisService::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping("/{id}/escalate")
    public ResponseEntity<DiagnosisResponseDto> escalateCase(@PathVariable Long id, @RequestBody(required = false) String reason) {
        return diagnosisRepository.findById(id).map(d -> {
            d.setIsEscalated(true);
            d.setStatus("ESCALATED");
            if (reason != null && !reason.isBlank()) {
                d.setExpertNotes(reason);
            }
            Diagnosis saved = diagnosisRepository.save(d);
            return ResponseEntity.ok(diagnosisService.toDto(saved));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/expert-review")
    public ResponseEntity<DiagnosisResponseDto> submitExpertReview(@PathVariable Long id, @RequestBody EscalationReviewDto review) {
        return diagnosisRepository.findById(id).map(d -> {
            d.setIsEscalated(false);
            d.setStatus("EXPERT_VERIFIED");
            if (review.getVerifiedDiseaseName() != null && !review.getVerifiedDiseaseName().isBlank()) {
                d.setDiseaseName(review.getVerifiedDiseaseName());
            }
            d.setExpertNotes("Agronomist Review: " + review.getExpertNotes() +
                    (review.getPrescribedBiologicalTreatment() != null ? " | Bio: " + review.getPrescribedBiologicalTreatment() : "") +
                    (review.getPrescribedChemicalTreatment() != null ? " | Chem: " + review.getPrescribedChemicalTreatment() : ""));
            Diagnosis saved = diagnosisRepository.save(d);
            return ResponseEntity.ok(diagnosisService.toDto(saved));
        }).orElse(ResponseEntity.notFound().build());
    }
}
