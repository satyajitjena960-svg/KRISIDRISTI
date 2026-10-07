package com.emp.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WhatsAppNotificationRequestDTO {
    private String recipientPhone; // e.g., "+919876543210"
    private String messageText;
    private String audioMediaUrl;
}