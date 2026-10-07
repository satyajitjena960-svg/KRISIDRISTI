package com.emp.demo.repository;

import com.emp.demo.entity.WhatsAppLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WhatsAppLogRepository extends JpaRepository<WhatsAppLog, String> {
    List<WhatsAppLog> findByRecipientPhone(String recipientPhone);
}