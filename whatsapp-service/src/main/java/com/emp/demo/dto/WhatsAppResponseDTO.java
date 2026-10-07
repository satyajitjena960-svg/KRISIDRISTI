package com.emp.demo.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WhatsAppResponseDTO {
    private String logId;
    private String recipientPhone;
    private String status;
    private String externalMessageId;
    private LocalDateTime timestamp;
}