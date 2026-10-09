package com.krishisathi.crop.repository;

import com.krishisathi.crop.model.FarmerCrop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmerCropRepository extends JpaRepository<FarmerCrop, Long> {
    List<FarmerCrop> findByFarmerPhone(String farmerPhone);
}
