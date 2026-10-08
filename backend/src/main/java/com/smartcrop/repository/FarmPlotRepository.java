package com.smartcrop.repository;

import com.smartcrop.entity.FarmPlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmPlotRepository extends JpaRepository<FarmPlot, Long> {
    List<FarmPlot> findByFarmerId(Long farmerId);
}
