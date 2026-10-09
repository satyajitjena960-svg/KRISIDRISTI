package com.krishisathi.rental.repository;

import com.krishisathi.rental.model.EquipmentListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentListingRepository extends JpaRepository<EquipmentListing, Long> {
    List<EquipmentListing> findByCategoryIgnoreCase(String category);
    List<EquipmentListing> findByOwnerPhone(String ownerPhone);
}
