package com.krishisathi.weather.controller;

import com.krishisathi.weather.dto.WeatherAdvisoryDto;
import com.krishisathi.weather.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentWeather(
            @RequestParam(name = "lat", required = false) Double lat,
            @RequestParam(name = "lon", required = false) Double lon) {
        try {
            WeatherAdvisoryDto dto = weatherService.getWeatherAndAdvisory(lat, lon);
            return ResponseEntity.ok(dto);
        } catch (Throwable t) {
            Map<String, Object> err = new HashMap<>();
            err.put("error", t.getMessage());
            err.put("exception", t.getClass().getName());
            StringWriter sw = new StringWriter();
            t.printStackTrace(new PrintWriter(sw));
            err.put("stacktrace", sw.toString());
            return ResponseEntity.status(500).body(err);
        }
    }

    @GetMapping("/advisory")
    public ResponseEntity<?> getAdvisory(
            @RequestParam(name = "lat", required = false) Double lat,
            @RequestParam(name = "lon", required = false) Double lon) {
        return getCurrentWeather(lat, lon);
    }
}
