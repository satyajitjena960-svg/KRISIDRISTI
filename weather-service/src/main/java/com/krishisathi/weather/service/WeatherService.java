package com.krishisathi.weather.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.krishisathi.weather.dto.WeatherAdvisoryDto;
import com.krishisathi.weather.model.WeatherQueryLog;
import com.krishisathi.weather.repository.WeatherQueryLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class WeatherService {

    private static final Logger log = LoggerFactory.getLogger(WeatherService.class);

    @Value("${krishisathi.weather.api-key:7bff343bc78eeacae20d89bc904e0765}")
    private String apiKey;

    @Value("${krishisathi.weather.base-url:https://api.openweathermap.org/data/2.5}")
    private String baseUrl;

    private final WeatherQueryLogRepository queryLogRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public WeatherService(WeatherQueryLogRepository queryLogRepository) {
        this.queryLogRepository = queryLogRepository;
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public WeatherAdvisoryDto getWeatherAndAdvisory(Double lat, Double lon) {
        double currentLat = (lat != null && lat != 0.0) ? lat : 20.2961;
        double currentLon = (lon != null && lon != 0.0) ? lon : 85.8245;

        WeatherAdvisoryDto dto = null;

        try {
            String cleanApiKey = (apiKey != null && !apiKey.trim().isEmpty()) ? apiKey.trim() : "7bff343bc78eeacae20d89bc904e0765";
            String cleanBaseUrl = (baseUrl != null && !baseUrl.trim().isEmpty()) ? baseUrl.trim() : "https://api.openweathermap.org/data/2.5";
            
            // Format strictly with Locale.US so decimals always use '.' and never ','
            String url = String.format(Locale.US, "%s/weather?lat=%.4f&lon=%.4f&appid=%s&units=metric",
                    cleanBaseUrl, currentLat, currentLon, cleanApiKey);

            log.info("Fetching live weather from OpenWeatherMap: {}", url);
            String response = restTemplate.getForObject(url, String.class);

            if (response != null && !response.trim().isEmpty()) {
                dto = parseOpenWeatherResponse(response);
            }
        } catch (Exception e) {
            log.warn("Could not fetch live OpenWeatherMap data (Reason: {}). Falling back to smart agro-weather simulation.", e.getMessage());
            dto = generateSimulatedWeatherData(currentLat, currentLon);
        }

        if (dto == null) {
            dto = generateSimulatedWeatherData(currentLat, currentLon);
        }

        // Apply Agricultural Expert Rules Engine
        applyAgriculturalAdvisories(dto);

        // Async log query to weather_db
        try {
            queryLogRepository.save(new WeatherQueryLog(
                    currentLat,
                    currentLon,
                    dto.getLocationName(),
                    dto.getTemperature(),
                    dto.getHumidity(),
                    dto.getCondition()
            ));
        } catch (Throwable t) {
            log.warn("Weather query log save skipped: {}", t.getMessage());
        }

        return dto;
    }

    private WeatherAdvisoryDto parseOpenWeatherResponse(String json) {
        try {
            JsonNode root = objectMapper.readTree(json);
            WeatherAdvisoryDto dto = new WeatherAdvisoryDto();

            String name = root.path("name").asText("Local Farmland");
            dto.setLocationName(name);

            JsonNode main = root.path("main");
            double temp = main.path("temp").asDouble(28.0);
            double feelsLike = main.path("feels_like").asDouble(temp);
            int humidity = main.path("humidity").asInt(60);

            dto.setTemperature(Math.round(temp * 10.0) / 10.0);
            dto.setFeelsLike(Math.round(feelsLike * 10.0) / 10.0);
            dto.setHumidity(humidity);

            JsonNode wind = root.path("wind");
            double speed = wind.path("speed").asDouble(3.0);
            dto.setWindSpeedKmH(Math.round(speed * 3.6 * 10.0) / 10.0); // m/s to km/h

            JsonNode weatherArr = root.path("weather");
            if (weatherArr.isArray() && !weatherArr.isEmpty()) {
                JsonNode w0 = weatherArr.get(0);
                dto.setCondition(w0.path("main").asText("Clear"));
                dto.setConditionDescription(w0.path("description").asText("Clear skies"));
                dto.setIconCode(w0.path("icon").asText("01d"));
            } else {
                dto.setCondition("Clear");
                dto.setConditionDescription("Sunny & clear skies");
                dto.setIconCode("01d");
            }
            return dto;
        } catch (Exception e) {
            log.error("Failed to parse weather JSON", e);
            return null;
        }
    }

    private WeatherAdvisoryDto generateSimulatedWeatherData(double lat, double lon) {
        WeatherAdvisoryDto dto = new WeatherAdvisoryDto();
        dto.setLocationName("Local Farmland (" + String.format(Locale.US, "%.2f", lat) + ", " + String.format(Locale.US, "%.2f", lon) + ")");
        dto.setTemperature(29.4);
        dto.setFeelsLike(31.2);
        dto.setHumidity(68);
        dto.setWindSpeedKmH(11.5);
        dto.setCondition("Partly Cloudy");
        dto.setConditionDescription("Scattered clouds with intermittent sunshine");
        dto.setIconCode("03d");
        return dto;
    }

    private void applyAgriculturalAdvisories(WeatherAdvisoryDto dto) {
        List<String> alerts = new ArrayList<>();
        String cond = (dto.getCondition() != null) ? dto.getCondition().toLowerCase() : "clear";

        boolean isRain = cond.contains("rain") || cond.contains("drizzle") || cond.contains("thunderstorm");
        dto.setRainExpectedSoon(isRain);

        if (isRain) {
            dto.setSprayAdvisory("DELAY_SPRAYING");
            dto.setIrrigationAdvisory("DEFER_IRRIGATION");
            alerts.add("⚠️ चेतावनी: बारिश के आसार हैं। यूरिया, कीटनाशक व पर्णीय छिड़काव तुरंत रोकें ताकि दवा धुल न जाए!");
            alerts.add("💧 नलकूप व ड्रिप सिंचाई बंद रखें ताकि जड़ों में जलभराव न हो।");
            dto.setAudioAdvisoryHindi("सावधान! बारिश की संभावना है। यूरिया या कीटनाशक का छिड़काव तुरंत रोक दें, अन्यथा दवा बहकर नष्ट हो जाएगी।");
            dto.setAudioAdvisoryEnglish("Caution! Rain predicted. Halt fertilizer and chemical sprays to prevent chemical wash-off.");
        } else {
            if (dto.getWindSpeedKmH() > 18.0) {
                dto.setSprayAdvisory("CAUTION");
                alerts.add("💨 हवा की तेज गति (" + String.format(Locale.US, "%.1f", dto.getWindSpeedKmH()) + " km/h): छिड़काव करने से दवा पड़ोस के खेतों में उड़ने का जोखिम है।");
            } else {
                dto.setSprayAdvisory("SAFE");
                alerts.add("✅ छिड़काव के लिए अनुकूल समय: हवा की गति शांत है और धूप खिली हुई है।");
            }

            if (dto.getHumidity() > 75) {
                alerts.add("🍄 उच्च आर्द्रता (" + dto.getHumidity() + "%): फफूंद जनित रोगों (झुलसा, रतुआ) की संभावना अधिक है। पत्तियों के नीचे जांचें।");
            }

            if (dto.getTemperature() > 36.0) {
                dto.setIrrigationAdvisory("IRRIGATE_LIGHTLY");
                alerts.add("☀️ तेज धूप व तापमान: जड़ों को ठंडक देने के लिए शाम के समय हल्की सिंचाई करें।");
            } else {
                dto.setIrrigationAdvisory("NORMAL");
            }

            dto.setAudioAdvisoryHindi("मौसम साफ है। छिड़काव के लिए परिस्थितियां अनुकूल हैं। खेत में नमी की स्थिति सामान्य है।");
            dto.setAudioAdvisoryEnglish("Weather is clear and favorable for crop maintenance and agricultural spraying.");
        }

        dto.setActionableAlerts(alerts);
    }
}
