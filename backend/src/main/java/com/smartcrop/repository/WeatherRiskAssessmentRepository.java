package com.smartcrop.repository;

import com.smartcrop.entity.WeatherRiskAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WeatherRiskAssessmentRepository extends JpaRepository<WeatherRiskAssessment, Long> {
    List<WeatherRiskAssessment> findByDistrictOrderByAssessedAtDesc(String district);
    Optional<WeatherRiskAssessment> findFirstByDistrictAndCropTypeOrderByAssessedAtDesc(String district, String cropType);
    List<WeatherRiskAssessment> findTop10ByOrderByAssessedAtDesc();
}
