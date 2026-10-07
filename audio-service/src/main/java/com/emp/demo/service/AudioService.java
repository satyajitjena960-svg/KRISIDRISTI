package com.emp.demo.service;

import com.emp.demo.dto.AudioRequestDTO;
import com.emp.demo.dto.AudioResponseDTO;
import com.emp.demo.entity.AudioAsset;
import com.emp.demo.repository.AudioAssetRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Optional;

@Service
public class AudioService {

    private final AudioAssetRepository repository;
    private final TtsService ttsService;

    @Value("${server.port:8085}")
    private String serverPort;

    public AudioService(AudioAssetRepository repository, TtsService ttsService) {
        this.repository = repository;
        this.ttsService = ttsService;
    }

    public AudioResponseDTO generateAudio(AudioRequestDTO request) {
        // Return existing asset if generated before
        Optional<AudioAsset> existing = repository.findByDiagnosisIdAndLanguageCode(
                request.getDiagnosisId(), request.getLanguageCode()
        );

        if (existing.isPresent()) {
            AudioAsset asset = existing.get();
            return AudioResponseDTO.builder()
                    .audioAssetId(asset.getId())
                    .diagnosisId(asset.getDiagnosisId())
                    .languageCode(asset.getLanguageCode())
                    .audioUrl(asset.getFileUrl())
                    .status("EXISTING")
                    .build();
        }

        try {
            String fileName = "audio_" + request.getDiagnosisId() + "_" + request.getLanguageCode() + ".mp3";
            File generatedFile = ttsService.generateAudioFile(fileName, request.getText(), request.getLanguageCode());

            String fileUrl = "http://localhost:" + serverPort + "/api/v1/audio/download/" + fileName;

            AudioAsset asset = AudioAsset.builder()
                    .diagnosisId(request.getDiagnosisId())
                    .languageCode(request.getLanguageCode())
                    .fileName(fileName)
                    .fileUrl(fileUrl)
                    .fileSizeBytes(generatedFile.length())
                    .build();

            AudioAsset savedAsset = repository.save(asset);

            return AudioResponseDTO.builder()
                    .audioAssetId(savedAsset.getId())
                    .diagnosisId(savedAsset.getDiagnosisId())
                    .languageCode(savedAsset.getLanguageCode())
                    .audioUrl(savedAsset.getFileUrl())
                    .status("GENERATED")
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate audio: " + e.getMessage(), e);
        }
    }

    public File getAudioFile(String fileName) {
        File file = new File("./audio-storage/" + fileName);
        if (!file.exists()) {
            throw new RuntimeException("Audio file not found: " + fileName);
        }
        return file;
    }
}