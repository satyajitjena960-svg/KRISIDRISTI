package com.smartcrop.repository;

import com.smartcrop.entity.FollowUpRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowUpRecordRepository extends JpaRepository<FollowUpRecord, Long> {
    List<FollowUpRecord> findByDiagnosisIdOrderByFollowUpDateDesc(Long diagnosisId);
    List<FollowUpRecord> findByFarmerIdOrderByFollowUpDateDesc(Long farmerId);
}
