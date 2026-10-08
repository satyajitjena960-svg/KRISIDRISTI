package org.krishisathi.diagnosisservice.repository;

import org.krishisathi.diagnosisservice.entity.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PredictionRepository
        extends JpaRepository<Prediction, UUID> {

    List<Prediction> findByDiagnosisId(UUID diagnosisId);
}