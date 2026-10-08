package org.krishisathi.diagnosisservice.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DiagnosisRequest {

    private String mediaId;

    private String cropCode;

    private String language;

    private boolean requestAudio;
}