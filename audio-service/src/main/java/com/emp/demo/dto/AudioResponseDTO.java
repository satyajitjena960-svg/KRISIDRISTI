package com.emp.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AudioResponseDTO {
    private String audioAssetId;
    private String diagnosisId;
    private String languageCode;
    private String audioUrl;
    private String status;
}