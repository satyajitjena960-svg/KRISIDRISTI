package org.krishisathi.diagnosisservice.service;

import lombok.RequiredArgsConstructor;
import org.krishisathi.diagnosisservice.dto.DiagnosisRequest;
import org.krishisathi.diagnosisservice.dto.DiagnosisResponse;
import org.krishisathi.diagnosisservice.entity.Diagnosis;
import org.krishisathi.diagnosisservice.entity.DiagnosisStatusHistory;
import org.krishisathi.diagnosisservice.entity.OutboxEvent;
import org.krishisathi.diagnosisservice.enums.OutboxEventStatus;
import org.krishisathi.diagnosisservice.exception.DiagnosisNotFoundException;
import org.krishisathi.diagnosisservice.repository.DiagnosisRepository;
import org.krishisathi.diagnosisservice.repository.DiagnosisStatusHistoryRepository;
import org.krishisathi.diagnosisservice.repository.OutboxEventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DiagnosisServiceImpl implements DiagnosisService {

    private final DiagnosisRepository diagnosisRepository;
    private final DiagnosisStatusHistoryRepository statusHistoryRepository;
    private final OutboxEventRepository outboxEventRepository;

    @Override
    @Transactional
    public DiagnosisResponse createDiagnosis(DiagnosisRequest request) {

        // 1. Create diagnosis object
        Diagnosis diagnosis = new Diagnosis();

        diagnosis.setMediaId(request.getMediaId());
        diagnosis.setCropCode(request.getCropCode());
        diagnosis.setLanguage(request.getLanguage());
        diagnosis.setRequestAudio(request.isRequestAudio());

        // 2. DO NOT set UUID manually
        // Hibernate will generate UUID automatically
        diagnosisRepository.save(diagnosis);

        // 3. Get generated UUID
        UUID diagnosisId = diagnosis.getUuid();

        // 4. Create correlation ID
        String correlationId = "dgn-" + diagnosisId;

        diagnosis.setCorrelationId(correlationId);

        // 5. Update diagnosis with correlation ID
        diagnosisRepository.save(diagnosis);

        // 6. Save status history
        DiagnosisStatusHistory history = new DiagnosisStatusHistory();

        history.setDiagnosisId(diagnosisId);
        history.setStatus(diagnosis.getStatus());
        history.setCorrelationId(correlationId);

        statusHistoryRepository.save(history);

        // 7. Create outbox event
        OutboxEvent event = new OutboxEvent();

        event.setEventId(UUID.randomUUID());
        event.setEventType("diagnosis.created");
        event.setCorrelationId(correlationId);
        event.setProducer("diagnosis-service");
        event.setSchemaVersion("1.0");
        event.setStatus(OutboxEventStatus.PENDING);

        String payload =
                "{"
                        + "\"diagnosisId\":\"" + diagnosisId + "\","
                        + "\"mediaId\":\"" + request.getMediaId() + "\","
                        + "\"cropCode\":\"" + request.getCropCode() + "\","
                        + "\"language\":\"" + request.getLanguage() + "\","
                        + "\"requestAudio\":" + request.isRequestAudio()
                        + "}";

        event.setPayload(payload);

        outboxEventRepository.save(event);

        // 8. Return response
        return new DiagnosisResponse(
                diagnosisId,
                diagnosis.getStatus().name()
        );
    }

    @Override
    public Diagnosis getDiagnosis(UUID id) {

        return diagnosisRepository.findById(id)
                .orElseThrow(
                        () -> new DiagnosisNotFoundException(
                                "Diagnosis not found with id: " + id
                        )
                );
    }

    @Override
    public List<Diagnosis> getAllDiagnoses() {

        return diagnosisRepository.findAll();
    }
}