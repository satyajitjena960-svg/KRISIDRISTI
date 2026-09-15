package com.smartcrop.controller;

import com.smartcrop.entity.OutbreakRecord;
import com.smartcrop.service.OutbreakService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/outbreaks")
public class OutbreakController {

    private final OutbreakService outbreakService;

    public OutbreakController(OutbreakService outbreakService) {
        this.outbreakService = outbreakService;
    }

    @GetMapping
    public ResponseEntity<List<OutbreakRecord>> getOutbreaks(@RequestParam(defaultValue = "Odisha") String state) {
        return ResponseEntity.ok(outbreakService.getOutbreaksByState(state));
    }

    @PostMapping("/report")
    public ResponseEntity<OutbreakRecord> reportCase(
            @RequestParam(defaultValue = "Odisha") String state,
            @RequestParam String district,
            @RequestParam String disease,
            @RequestParam(defaultValue = "Tomato") String crop) {
        return ResponseEntity.ok(outbreakService.recordOrUpdateCase(state, district, disease, crop));
    }
}
