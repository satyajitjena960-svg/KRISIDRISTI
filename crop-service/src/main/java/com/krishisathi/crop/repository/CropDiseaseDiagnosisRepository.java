package com.krishisathi.crop.repository;

import com.krishisathi.crop.model.CropDiseaseDiagnosis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropDiseaseDiagnosisRepository extends JpaRepository<CropDiseaseDiagnosis, Long> {
    List<CropDiseaseDiagnosis> findByFarmerPhoneOrderByDiagnosedAtDesc(String farmerPhone);
}
