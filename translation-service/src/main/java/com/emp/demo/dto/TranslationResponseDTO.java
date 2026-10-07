package com.emp.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TranslationResponseDTO {
    private String templateKey;
    private String languageCode;
    private String resolvedText;
    private boolean fallbackUsed;
}