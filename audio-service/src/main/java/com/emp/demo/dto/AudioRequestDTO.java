package com.emp.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AudioRequestDTO {
    private String diagnosisId;
    private String text;
    private String languageCode; // en, hi, mr
}