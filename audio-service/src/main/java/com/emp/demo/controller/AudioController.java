package com.emp.demo.controller;

import com.emp.demo.dto.AudioRequestDTO;
import com.emp.demo.dto.AudioResponseDTO;
import com.emp.demo.service.AudioService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
@RequestMapping("/api/v1/audio")
public class AudioController {

    private final AudioService audioService;

    public AudioController(AudioService audioService) {
        this.audioService = audioService;
    }

    // Generate Audio File Endpoint (FR-06 / US-08)
    @PostMapping("/generate")
    public ResponseEntity<AudioResponseDTO> generateAudio(@RequestBody AudioRequestDTO request) {
        AudioResponseDTO response = audioService.generateAudio(request);
        return ResponseEntity.ok(response);
    }

    // Download/Play Audio Endpoint
    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadAudio(@PathVariable String fileName) {
        File file = audioService.getAudioFile(fileName);
        Resource resource = new FileSystemResource(file);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("audio/mpeg"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .body(resource);
    }
}