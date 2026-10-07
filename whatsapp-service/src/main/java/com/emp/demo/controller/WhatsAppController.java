package com.emp.demo.controller;

import com.emp.demo.dto.WhatsAppNotificationRequestDTO;
import com.emp.demo.dto.WhatsAppResponseDTO;
import com.emp.demo.entity.WhatsAppLog;
import com.emp.demo.service.WhatsAppService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/whatsapp")
public class WhatsAppController {

    private final WhatsAppService whatsAppService;

    public WhatsAppController(WhatsAppService whatsAppService) {
        this.whatsAppService = whatsAppService;
    }

    // Send WhatsApp notification containing advisory text and voice note URL
    @PostMapping("/send")
    public ResponseEntity<WhatsAppResponseDTO> sendNotification(@RequestBody WhatsAppNotificationRequestDTO request) {
        WhatsAppResponseDTO response = whatsAppService.sendAdvisoryNotification(request);
        return ResponseEntity.ok(response);
    }

    // Get delivery history logs by phone number
    @GetMapping("/logs/{phone}")
    public ResponseEntity<List<WhatsAppLog>> getLogsByPhone(@PathVariable String phone) {
        return ResponseEntity.ok(whatsAppService.getLogsByPhone(phone));
    }
}