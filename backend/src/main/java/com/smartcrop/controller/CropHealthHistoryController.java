package com.smartcrop.controller;

import com.smartcrop.entity.CropHealthHistory;
import com.smartcrop.repository.CropHealthHistoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/health-timeline")
public class CropHealthHistoryController {

    private final CropHealthHistoryRepository healthHistoryRepository;

    public CropHealthHistoryController(CropHealthHistoryRepository healthHistoryRepository) {
        this.healthHistoryRepository = healthHistoryRepository;
    }

    @GetMapping("/plot/{plotId}")
    public ResponseEntity<List<CropHealthHistory>> getHistoryByPlot(@PathVariable Long plotId) {
        return ResponseEntity.ok(healthHistoryRepository.findByFarmPlotIdOrderByCheckDateAsc(plotId));
    }

    @PostMapping
    public ResponseEntity<CropHealthHistory> addHealthRecord(@RequestBody CropHealthHistory record) {
        return ResponseEntity.ok(healthHistoryRepository.save(record));
    }
}
