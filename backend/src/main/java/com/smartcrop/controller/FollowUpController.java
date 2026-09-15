package com.smartcrop.controller;

import com.smartcrop.dto.FollowUpRequestDto;
import com.smartcrop.dto.FollowUpResponseDto;
import com.smartcrop.entity.FollowUpRecord;
import com.smartcrop.service.FollowUpService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow-ups")
public class FollowUpController {

    private final FollowUpService followUpService;

    public FollowUpController(FollowUpService followUpService) {
        this.followUpService = followUpService;
    }

    @PostMapping
    public ResponseEntity<FollowUpResponseDto> submitFollowUp(@RequestBody FollowUpRequestDto request) {
        FollowUpResponseDto response = followUpService.submitFollowUp(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/diagnosis/{diagnosisId}")
    public ResponseEntity<List<FollowUpRecord>> getFollowUpsForDiagnosis(@PathVariable Long diagnosisId) {
        return ResponseEntity.ok(followUpService.getFollowUpsForDiagnosis(diagnosisId));
    }
}
