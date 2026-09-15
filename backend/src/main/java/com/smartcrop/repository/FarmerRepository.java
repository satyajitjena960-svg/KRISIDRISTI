package com.smartcrop.repository;

import com.smartcrop.entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Long> {
    Optional<Farmer> findByPhone(String phone);
    Optional<Farmer> findByEmail(String email);
}
