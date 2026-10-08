package com.smartcrop.repository;

import com.smartcrop.entity.NotificationAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationAlertRepository extends JpaRepository<NotificationAlert, Long> {
    List<NotificationAlert> findByFarmerIdOrderByCreatedAtDesc(Long farmerId);
    List<NotificationAlert> findByFarmerIdAndIsReadFalseOrderByCreatedAtDesc(Long farmerId);
    List<NotificationAlert> findTop20ByOrderByCreatedAtDesc();
}
