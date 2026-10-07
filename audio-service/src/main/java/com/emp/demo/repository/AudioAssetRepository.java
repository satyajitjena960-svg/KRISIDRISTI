package com.emp.demo.repository;

import com.emp.demo.entity.AudioAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AudioAssetRepository extends JpaRepository<AudioAsset, String> {
    Optional<AudioAsset> findByDiagnosisIdAndLanguageCode(String diagnosisId, String languageCode);
}