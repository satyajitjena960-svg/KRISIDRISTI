package com.emp.demo.service;

import com.emp.demo.dto.TemplateCreateDTO;
import com.emp.demo.dto.TranslationRequestDTO;
import com.emp.demo.dto.TranslationResponseDTO;
import com.emp.demo.entity.TranslationTemplate;
import com.emp.demo.repository.TranslationTemplateRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TranslationService {

    private final TranslationTemplateRepository repository;

    @Value("${translation.default-language:en}")
    private String defaultLanguage;

    public TranslationService(TranslationTemplateRepository repository) {
        this.repository = repository;
    }

    public TranslationResponseDTO resolveTemplate(TranslationRequestDTO request) {
        String targetLang = (request.getLanguageCode() != null && !request.getLanguageCode().isBlank())
                ? request.getLanguageCode().toLowerCase()
                : defaultLanguage;

        boolean fallbackUsed = false;
        Optional<TranslationTemplate> templateOpt = repository.findByTemplateKeyAndLanguageCode(
                request.getTemplateKey(), targetLang
        );

        // Fallback to English if target language template is missing
        if (templateOpt.isEmpty() && !targetLang.equals(defaultLanguage)) {
            templateOpt = repository.findByTemplateKeyAndLanguageCode(request.getTemplateKey(), defaultLanguage);
            fallbackUsed = true;
        }

        if (templateOpt.isEmpty()) {
            throw new RuntimeException("Template key not found: " + request.getTemplateKey());
        }

        String rawText = templateOpt.get().getTemplateText();
        String resolvedText = interpolateVariables(rawText, request.getVariables());

        return TranslationResponseDTO.builder()
                .templateKey(request.getTemplateKey())
                .languageCode(fallbackUsed ? defaultLanguage : targetLang)
                .resolvedText(resolvedText)
                .fallbackUsed(fallbackUsed)
                .build();
    }

    public TranslationTemplate saveOrUpdateTemplate(TemplateCreateDTO dto) {
        Optional<TranslationTemplate> existing = repository.findByTemplateKeyAndLanguageCode(
                dto.getTemplateKey(), dto.getLanguageCode().toLowerCase()
        );

        TranslationTemplate template;
        if (existing.isPresent()) {
            template = existing.get();
            template.setTemplateText(dto.getTemplateText());
        } else {
            template = TranslationTemplate.builder()
                    .templateKey(dto.getTemplateKey())
                    .languageCode(dto.getLanguageCode().toLowerCase())
                    .templateText(dto.getTemplateText())
                    .build();
        }
        return repository.save(template);
    }

    public List<String> getSupportedLanguages() {
        return repository.findSupportedLanguages();
    }

    public List<TranslationTemplate> getTemplatesByKey(String key) {
        return repository.findByTemplateKey(key);
    }

    private String interpolateVariables(String rawText, Map<String, String> variables) {
        if (variables == null || variables.isEmpty()) {
            return rawText;
        }
        String interpolated = rawText;
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            String placeholder = "{" + entry.getKey() + "}";
            String value = entry.getValue() != null ? entry.getValue() : "";
            interpolated = interpolated.replace(placeholder, value);
        }
        return interpolated;
    }
}