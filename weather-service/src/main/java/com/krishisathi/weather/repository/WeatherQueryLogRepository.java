package com.krishisathi.weather.repository;

import com.krishisathi.weather.model.WeatherQueryLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeatherQueryLogRepository extends JpaRepository<WeatherQueryLog, Long> {
}
