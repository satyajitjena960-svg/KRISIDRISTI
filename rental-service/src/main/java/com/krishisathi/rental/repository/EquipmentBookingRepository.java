package com.krishisathi.rental.repository;

import com.krishisathi.rental.model.EquipmentBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentBookingRepository extends JpaRepository<EquipmentBooking, Long> {
    List<EquipmentBooking> findByRenterPhone(String renterPhone);
    List<EquipmentBooking> findByListingId(Long listingId);
}
