package com.smartcrop.repository;

import com.smartcrop.entity.Diagnosis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiagnosisRepository extends JpaRepository<Diagnosis, Long> {
    List<Diagnosis> findByFarmerIdOrderByDiagnosisDateDesc(Long farmerId);
    List<Diagnosis> findByFarmPlotIdOrderByDiagnosisDateDesc(Long farmPlotId);
    List<Diagnosis> findByIsEscalatedTrueOrderByDiagnosisDateDesc();
    List<Diagnosis> findByDistrictOrderByDiagnosisDateDesc(String district);

    @Query("SELECT d.diseaseName, COUNT(d) FROM Diagnosis d GROUP BY d.diseaseName ORDER BY COUNT(d) DESC")
    List<Object[]> findTopDiseases();

    @Query("SELECT d.cropType, COUNT(d) FROM Diagnosis d GROUP BY d.cropType ORDER BY COUNT(d) DESC")
    List<Object[]> findCropDistribution();

    @Query("SELECT d.district, COUNT(d) FROM Diagnosis d GROUP BY d.district ORDER BY COUNT(d) DESC")
    List<Object[]> findDistrictDistribution();
}
