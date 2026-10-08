package org.krishisathi.diagnosisservice.repository;

import org.krishisathi.diagnosisservice.entity.DiagnosisStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DiagnosisStatusHistoryRepository
        extends JpaRepository<DiagnosisStatusHistory, UUID> {

    List<DiagnosisStatusHistory> findByDiagnosisId(UUID diagnosisId);
}