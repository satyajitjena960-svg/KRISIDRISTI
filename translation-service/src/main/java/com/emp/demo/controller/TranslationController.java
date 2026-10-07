package com.emp.demo.controller;

import com.emp.demo.dto.TemplateCreateDTO;
import com.emp.demo.dto.TranslationRequestDTO;
import com.emp.demo.dto.TranslationResponseDTO;
import com.emp.demo.entity.TranslationTemplate;
import com.emp.demo.service.TranslationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/translations")
public class TranslationController {

    private final TranslationService translationService;

    public TranslationController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @PostMapping("/resolve")
    public ResponseEntity<TranslationResponseDTO> resolveTranslation(@RequestBody TranslationRequestDTO request) {
        TranslationResponseDTO response = translationService.resolveTemplate(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/templates")
    public ResponseEntity<TranslationTemplate> createOrUpdateTemplate(@RequestBody TemplateCreateDTO dto) {
        TranslationTemplate saved = translationService.saveOrUpdateTemplate(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    @GetMapping("/languages")
    public ResponseEntity<List<String>> getSupportedLanguages() {
        return ResponseEntity.ok(translationService.getSupportedLanguages());
    }
    @GetMapping("/templates/{key}")
    public ResponseEntity<List<TranslationTemplate>> getTemplatesByKey(@PathVariable String key) {
        return ResponseEntity.ok(translationService.getTemplatesByKey(key));
    }
}