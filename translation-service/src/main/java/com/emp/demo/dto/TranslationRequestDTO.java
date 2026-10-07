package com.emp.demo.dto;

import lombok.*;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TranslationRequestDTO {
    private String templateKey;
    private String languageCode;
    private Map<String, String> variables;
}