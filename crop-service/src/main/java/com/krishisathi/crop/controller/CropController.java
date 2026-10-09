package com.krishisathi.crop.controller;

import com.krishisathi.crop.dto.CropGuidanceDto;
import com.krishisathi.crop.dto.DiseaseDiagnosisRequestDto;
import com.krishisathi.crop.dto.DiseaseDiagnosisResultDto;
import com.krishisathi.crop.model.CropDiseaseDiagnosis;
import com.krishisathi.crop.model.FarmerCrop;
import com.krishisathi.crop.service.CropGuidanceService;
import com.krishisathi.crop.service.DiseaseDetectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
@CrossOrigin(origins = "*")
public class CropController {

    private final CropGuidanceService guidanceService;
    private final DiseaseDetectionService diseaseService;

    public CropController(CropGuidanceService guidanceService,
                          DiseaseDetectionService diseaseService) {
        this.guidanceService = guidanceService;
        this.diseaseService = diseaseService;
    }

    @PostMapping
    public ResponseEntity<FarmerCrop> addCrop(@RequestBody FarmerCrop crop) {
        return ResponseEntity.ok(guidanceService.saveCrop(crop));
    }

    @GetMapping("/farmer/{phoneNumber}")
    public ResponseEntity<List<FarmerCrop>> getFarmerCrops(@PathVariable("phoneNumber") String phoneNumber) {
        return ResponseEntity.ok(guidanceService.getCropsByFarmer(phoneNumber));
    }

    @GetMapping("/{cropId}/guidance")
    public ResponseEntity<CropGuidanceDto> getGuidance(@PathVariable("cropId") Long cropId) {
        return ResponseEntity.ok(guidanceService.generateGuidance(cropId));
    }

    @DeleteMapping("/{cropId}")
    public ResponseEntity<?> deleteCrop(@PathVariable("cropId") Long cropId) {
        guidanceService.deleteCrop(cropId);
        return ResponseEntity.ok().build();
    }

    // --- AI Disease Detection Endpoints ---

    @PostMapping("/disease/diagnose")
    public ResponseEntity<DiseaseDiagnosisResultDto> diagnoseDisease(@RequestBody DiseaseDiagnosisRequestDto request) {
        return ResponseEntity.ok(diseaseService.diagnoseCrop(request));
    }

    @GetMapping("/disease/history/{phoneNumber}")
    public ResponseEntity<List<CropDiseaseDiagnosis>> getDiseaseHistory(@PathVariable("phoneNumber") String phoneNumber) {
        return ResponseEntity.ok(diseaseService.getHistoryByFarmer(phoneNumber));
    }
}
