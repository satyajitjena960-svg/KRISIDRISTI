package org.krishisathi.diagnosisservice.controller;

import lombok.RequiredArgsConstructor;
import org.krishisathi.diagnosisservice.dto.DiagnosisRequest;
import org.krishisathi.diagnosisservice.dto.DiagnosisResponse;
import org.krishisathi.diagnosisservice.entity.Diagnosis;
import org.krishisathi.diagnosisservice.service.DiagnosisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/diagnoses")
@RequiredArgsConstructor
public class DiagnosisController {

    private final DiagnosisService diagnosisService;

    @PostMapping
    public ResponseEntity<DiagnosisResponse> createDiagnosis(
            @RequestBody DiagnosisRequest request) {

        DiagnosisResponse response =
                diagnosisService.createDiagnosis(request);

        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Diagnosis> getDiagnosis(
            @PathVariable UUID id) {

        Diagnosis diagnosis =
                diagnosisService.getDiagnosis(id);

        return ResponseEntity.ok(diagnosis);
    }

    @GetMapping
    public ResponseEntity<List<Diagnosis>> getAllDiagnoses() {

        return ResponseEntity.ok(
                diagnosisService.getAllDiagnoses()
        );
    }
}