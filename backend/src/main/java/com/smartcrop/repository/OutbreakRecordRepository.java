package com.smartcrop.repository;

import com.smartcrop.entity.OutbreakRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OutbreakRecordRepository extends JpaRepository<OutbreakRecord, Long> {
    List<OutbreakRecord> findByStateOrderByReportedCasesDesc(String state);
    Optional<OutbreakRecord> findByDistrictAndPrimaryDisease(String district, String primaryDisease);
    List<OutbreakRecord> findByAlertLevel(String alertLevel);
}
