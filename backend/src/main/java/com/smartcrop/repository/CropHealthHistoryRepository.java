package com.smartcrop.repository;

import com.smartcrop.entity.CropHealthHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropHealthHistoryRepository extends JpaRepository<CropHealthHistory, Long> {
    List<CropHealthHistory> findByFarmPlotIdOrderByCheckDateAsc(Long farmPlotId);
}
