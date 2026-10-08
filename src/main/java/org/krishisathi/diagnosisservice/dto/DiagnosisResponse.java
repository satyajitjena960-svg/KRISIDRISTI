package org.krishisathi.diagnosisservice.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DiagnosisResponse {

    private UUID diagnosisId;

    private String status;
}