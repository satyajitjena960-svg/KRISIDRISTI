package org.krishisathi.diagnosisservice.service;

import org.krishisathi.diagnosisservice.dto.DiagnosisRequest;
import org.krishisathi.diagnosisservice.dto.DiagnosisResponse;
import org.krishisathi.diagnosisservice.entity.Diagnosis;

import java.util.List;
import java.util.UUID;

public interface DiagnosisService {

    DiagnosisResponse createDiagnosis(DiagnosisRequest request);

    Diagnosis getDiagnosis(UUID id);

    List<Diagnosis> getAllDiagnoses();
}