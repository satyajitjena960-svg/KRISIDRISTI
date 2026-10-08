package org.krishisathi.diagnosisservice.repository;

import org.krishisathi.diagnosisservice.entity.OutboxEvent;
import org.krishisathi.diagnosisservice.enums.OutboxEventStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OutboxEventRepository
        extends JpaRepository<OutboxEvent, UUID> {

    List<OutboxEvent> findByStatus(OutboxEventStatus status);
}