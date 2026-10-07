package com.emp.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemplateCreateDTO {
    private String templateKey;
    private String languageCode;
    private String templateText;
}