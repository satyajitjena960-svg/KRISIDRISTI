package com.emp.demo.config;

import com.emp.demo.dto.TemplateCreateDTO;
import com.emp.demo.service.TranslationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TranslationService translationService;

    public DataInitializer(TranslationService translationService) {
        this.translationService = translationService;
    }

    @Override
    public void run(String... args) {
        translationService.saveOrUpdateTemplate(TemplateCreateDTO.builder()
                .templateKey("DIAGNOSIS_SUCCESS")
                .languageCode("en")
                .templateText("Your {crop} crop likely shows symptoms of {disease} with {confidence}% confidence. Prevention: {prevention}")
                .build());

        translationService.saveOrUpdateTemplate(TemplateCreateDTO.builder()
                .templateKey("LOW_CONFIDENCE_WARNING")
                .languageCode("en")
                .templateText("The image quality is unclear to confirm {crop} health. Please re-capture a clear photo under daylight or consult an expert.")
                .build());

        translationService.saveOrUpdateTemplate(TemplateCreateDTO.builder()
                .templateKey("DIAGNOSIS_SUCCESS")
                .languageCode("hi")
                .templateText("आपकी {crop} की फसल में {disease} होने की {confidence}% संभावना है। रोकथाम: {prevention}")
                .build());

        translationService.saveOrUpdateTemplate(TemplateCreateDTO.builder()
                .templateKey("LOW_CONFIDENCE_WARNING")
                .languageCode("hi")
                .templateText("चित्र स्पष्ट नहीं है। कृपया {crop} के पत्ते की साफ तस्वीर दिन की रोशनी में खींचकर पुनः प्रयास करें या विशेषज्ञ सहायता लें।")
                .build());

        translationService.saveOrUpdateTemplate(TemplateCreateDTO.builder()
                .templateKey("DIAGNOSIS_SUCCESS")
                .languageCode("mr")
                .templateText("तुमच्या {crop} पिकावर {disease} चा प्रादुर्भाव असण्याची {confidence}% शक्यता आहे. प्रतिबंधक उपाय: {prevention}")
                .build());
    }
}