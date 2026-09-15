package com.smartcrop.controller;

import com.smartcrop.entity.FarmPlot;
import com.smartcrop.repository.FarmPlotRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farms")
public class FarmPlotController {

    private final FarmPlotRepository farmPlotRepository;

    public FarmPlotController(FarmPlotRepository farmPlotRepository) {
        this.farmPlotRepository = farmPlotRepository;
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<FarmPlot>> getPlotsByFarmer(@PathVariable Long farmerId) {
        return ResponseEntity.ok(farmPlotRepository.findByFarmerId(farmerId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FarmPlot> getPlotById(@PathVariable Long id) {
        return farmPlotRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FarmPlot> createPlot(@RequestBody FarmPlot plot) {
        FarmPlot saved = farmPlotRepository.save(plot);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlot(@PathVariable Long id) {
        farmPlotRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
