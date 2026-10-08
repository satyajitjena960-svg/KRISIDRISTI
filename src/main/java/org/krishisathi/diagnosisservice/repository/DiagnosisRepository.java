package org.krishisathi.diagnosisservice.repository;

import org.krishisathi.diagnosisservice.entity.Diagnosis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DiagnosisRepository
        extends JpaRepository<Diagnosis, UUID> {
}