package com.emp.demo.service;

import com.emp.demo.dto.WhatsAppNotificationRequestDTO;
import com.emp.demo.dto.WhatsAppResponseDTO;
import com.emp.demo.entity.WhatsAppLog;
import com.emp.demo.repository.WhatsAppLogRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class WhatsAppService {

    private final WhatsAppLogRepository repository;

    @Value("${whatsapp.sender-phone-number:+14155238886}")
    private String senderPhone;

    public WhatsAppService(WhatsAppLogRepository repository) {
        this.repository = repository;
    }

    public WhatsAppResponseDTO sendAdvisoryNotification(WhatsAppNotificationRequestDTO request) {
        // Simulating WhatsApp Cloud API / Twilio Message Dispatch
        String externalId = "WA_MSG_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        WhatsAppLog log = WhatsAppLog.builder()
                .recipientPhone(request.getRecipientPhone())
                .messageBody(request.getMessageText())
                .audioMediaUrl(request.getAudioMediaUrl())
                .status("SENT")
                .externalMessageId(externalId)
                .build();

        WhatsAppLog savedLog = repository.save(log);

        return WhatsAppResponseDTO.builder()
                .logId(savedLog.getId())
                .recipientPhone(savedLog.getRecipientPhone())
                .status(savedLog.getStatus())
                .externalMessageId(savedLog.getExternalMessageId())
                .timestamp(savedLog.getSentAt())
                .build();
    }

    public List<WhatsAppLog> getLogsByPhone(String phone) {
        return repository.findByRecipientPhone(phone);
    }
}