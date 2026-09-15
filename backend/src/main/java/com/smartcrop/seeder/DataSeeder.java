package com.smartcrop.seeder;

import com.smartcrop.entity.*;
import com.smartcrop.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final FarmerRepository farmerRepository;
    private final FarmPlotRepository farmPlotRepository;
    private final DiagnosisRepository diagnosisRepository;
    private final CropHealthHistoryRepository healthHistoryRepository;
    private final OutbreakRecordRepository outbreakRepository;
    private final WeatherRiskAssessmentRepository weatherRiskRepository;
    private final NotificationAlertRepository alertRepository;

    public DataSeeder(FarmerRepository farmerRepository,
                      FarmPlotRepository farmPlotRepository,
                      DiagnosisRepository diagnosisRepository,
                      CropHealthHistoryRepository healthHistoryRepository,
                      OutbreakRecordRepository outbreakRepository,
                      WeatherRiskAssessmentRepository weatherRiskRepository,
                      NotificationAlertRepository alertRepository) {
        this.farmerRepository = farmerRepository;
        this.farmPlotRepository = farmPlotRepository;
        this.diagnosisRepository = diagnosisRepository;
        this.healthHistoryRepository = healthHistoryRepository;
        this.outbreakRepository = outbreakRepository;
        this.weatherRiskRepository = weatherRiskRepository;
        this.alertRepository = alertRepository;
    }

    @Override
    public void run(String... args) {
        if (farmerRepository.count() > 0) return;

        // 1. Seed Farmers
        Farmer farmer1 = new Farmer("Ramesh Chandra Pradhan", "+91 9876543210", "ramesh.farmer@example.com", "Barang", "Cuttack", "Odisha", "or", "FARMER");
        Farmer expert = new Farmer("Dr. Ananya Mishra (Agronomist)", "+91 9123456780", "dr.ananya@ouat.ac.in", "Bhubaneswar", "Khordha", "Odisha", "en", "EXPERT");
        Farmer admin = new Farmer("State Agricultural Directorate", "+91 9437012345", "admin.krishi@odisha.gov.in", "Bhubaneswar", "Khordha", "Odisha", "en", "ADMIN");

        farmerRepository.saveAll(List.of(farmer1, expert, admin));

        // 2. Seed Farm Plots for Ramesh (Feature 4 - Farmer Crop Profile)
        // Rice - 2 acres, Tomato - 1 acre, Potato - 1.5 acres
        FarmPlot plotRice = new FarmPlot(farmer1.getId(), "North Canal Plot", "Rice", "Swarna Sub-1", 2.0,
                LocalDate.now().minusMonths(2), "Barang, Cuttack", "Alluvial Clay", "Canal Irrigated",
                "None", "Azospirillum bio-fertilizer");

        FarmPlot plotTomato = new FarmPlot(farmer1.getId(), "Central Greenhouse Plot", "Tomato", "Pusa Ruby", 1.0,
                LocalDate.now().minusMonths(1), "Barang, Cuttack", "Sandy Loam", "Drip Irrigation",
                "Early Blight (Previous Season)", "Neem oil spray, Straw mulching");

        FarmPlot plotPotato = new FarmPlot(farmer1.getId(), "South Field Plot", "Potato", "Kufri Jyoti", 1.5,
                LocalDate.now().minusDays(20), "Barang, Cuttack", "Loamy Soil", "Furrow Irrigation",
                "Late Blight (Minor)", "Trichoderma soil application");

        farmPlotRepository.saveAll(List.of(plotRice, plotTomato, plotPotato));

        // 3. Seed Crop Health History for Tomato Plot (Feature 5 - Crop Health History)
        // June 1 -> Healthy, June 8 -> Early symptoms, June 15 -> Moderate disease, June 22 -> Improving, June 29 -> Healthy
        CropHealthHistory h1 = new CropHealthHistory(plotTomato.getId(), "Tomato", LocalDate.of(2026, 6, 1),
                "Healthy", 0.0, "Vibrant green foliage, sturdy stems, active flowering", "/assets/sample-diseases/tomato-healthy.jpg", "Applied organic compost");

        CropHealthHistory h2 = new CropHealthHistory(plotTomato.getId(), "Tomato", LocalDate.of(2026, 6, 8),
                "Early symptoms", 22.0, "Small brown spots observed on lowest 3 tiers of leaves", "/assets/sample-diseases/tomato-early-spots.jpg", "Isolated affected bottom leaves, applied neem spray");

        CropHealthHistory h3 = new CropHealthHistory(plotTomato.getId(), "Tomato", LocalDate.of(2026, 6, 15),
                "Moderate disease", 62.0, "Concentric target-board rings with yellow chlorotic halos on foliage", "/assets/sample-diseases/tomato-early-blight.jpg", "Sprayed Trichoderma viride & balanced drip watering");

        CropHealthHistory h4 = new CropHealthHistory(plotTomato.getId(), "Tomato", LocalDate.of(2026, 6, 22),
                "Improving", 38.0, "Lesions dried and stopped spreading; new upper leaves are clean and vigorous", "/assets/sample-diseases/tomato-recovering.jpg", "Foliar bio-fertilizer boost; removed dried leaf debris");

        CropHealthHistory h5 = new CropHealthHistory(plotTomato.getId(), "Tomato", LocalDate.of(2026, 6, 29),
                "Healthy", 8.0, "Crop fully stabilized, high fruit set, clear canopy", "/assets/sample-diseases/tomato-healthy.jpg", "Weekly preventive monitoring maintained");

        healthHistoryRepository.saveAll(List.of(h1, h2, h3, h4, h5));

        // 4. Seed Active Diagnosis (Feature 1 & Feature 6)
        Diagnosis d1 = new Diagnosis();
        d1.setFarmerId(farmer1.getId());
        d1.setFarmPlotId(plotTomato.getId());
        d1.setCropType("Tomato");
        d1.setDiseaseName("Tomato Early Blight");
        d1.setScientificName("Alternaria solani");
        d1.setConfidenceScore(92.5);
        d1.setSeverityPercentage(62.0);
        d1.setSeverityLevel("SEVERE");
        d1.setSymptoms("Concentric dark brown target-like rings on older lower leaves;;Yellow halo surrounding necrotic brown leaf spots;;Collar rot on stems near the soil surface");
        d1.setPossibleCauses("Warm temperatures (24-30°C) with alternating dry and wet periods;;High relative humidity from evening dews;;Fungal spores persisting in crop residue");
        d1.setBiologicalControl("Foliar spray of Trichoderma viride @ 5g/L water every 7 days;;Spray fermented buttermilk + cow urine solution (1:10) as bio-fungicide;;Mulch around plants with dry straw to prevent soil splash");
        d1.setChemicalControl("Mancozeb 75% WP @ 2.5 g/L water or Chlorothalonil 75% WP @ 2 g/L water;;Azoxystrobin 23% SC @ 1 ml/L for systemic cure");
        d1.setPreventiveMeasures("Prune lower leaves touching the ground;;Drip irrigation rather than overhead sprinkling;;Sanitize all tools between plot checks");
        d1.setSafetyDisclaimer("ADVISORY ONLY: Please consult a local Krishi Vigyan Kendra (KVK) specialist before applying synthetic chemicals.");
        d1.setImageUrl("/assets/sample-diseases/tomato-early-blight.jpg");
        d1.setDistrict("Cuttack");
        d1.setVillage("Barang");
        d1.setStatus("ACTIVE");
        d1.setIsEscalated(true);
        d1.setExpertNotes("High severity detected (62%). Forwarded to Extension Agronomist Dr. Ananya Mishra.");
        d1.setDiagnosisDate(LocalDateTime.now().minusDays(5));
        d1.setFollowUpDueDate(LocalDateTime.now());
        diagnosisRepository.save(d1);

        // 5. Seed Outbreak Records for Odisha (Feature 3 - Location-Based Disease Monitoring)
        // Odisha: Cuttack 37 cases, Balasore 18 cases, Khordha 12 cases, Puri 5 cases
        OutbreakRecord o1 = new OutbreakRecord("Odisha", "Cuttack", "Tomato Early Blight", "Tomato", 37, "OUTBREAK_WARNING", 20.4625, 85.8828);
        OutbreakRecord o2 = new OutbreakRecord("Odisha", "Balasore", "Rice Blast", "Rice", 18, "WATCH", 21.4934, 86.9135);
        OutbreakRecord o3 = new OutbreakRecord("Odisha", "Khordha", "Potato Late Blight", "Potato", 12, "WATCH", 20.1818, 85.6214);
        OutbreakRecord o4 = new OutbreakRecord("Odisha", "Puri", "Chili Leaf Curl", "Chili", 5, "NORMAL", 19.8135, 85.8312);
        OutbreakRecord o5 = new OutbreakRecord("Odisha", "Sambalpur", "Rice Blast", "Rice", 14, "WATCH", 21.4669, 83.9812);
        OutbreakRecord o6 = new OutbreakRecord("Odisha", "Ganjam", "Tomato Early Blight", "Tomato", 9, "NORMAL", 19.3800, 84.8700);
        outbreakRepository.saveAll(List.of(o1, o2, o3, o4, o5, o6));

        // 6. Seed Weather Risk Assessment (Feature 2 - Weather Risk Prediction)
        WeatherRiskAssessment w1 = new WeatherRiskAssessment(
                "Tomato", "Cuttack", "Odisha", 28.2, 86.0, 48.0,
                "Humid & Overcast with intermittent drizzle",
                "Extended moisture period over next 72 hours across Mahanadi delta",
                "HIGH", 88.0, "Fungal Blight (Alternaria / Phytophthora)",
                "⚠️ High Risk: Conditions are favorable for fungal disease during the next 3 days. Elevated humidity (86%) and leaf wetness accelerate spore germination.",
                "1. Apply preventive Trichoderma viride bio-spray immediately.\n2. Cease sprinkler irrigation; maintain ditch drainage.\n3. Remove symptomatic ground-level foliage."
        );
        weatherRiskRepository.save(w1);

        // 7. Seed Smart Alerts (Feature 7 - Smart Alerts & Notifications)
        NotificationAlert a1 = new NotificationAlert(
                farmer1.getId(),
                "⚠️ Disease Risk Alert (Weather-Driven)",
                "Humidity is expected to remain high (>85%) for the next 48 hours. Your Tomato crop has previously shown signs of fungal disease.",
                "DISEASE_RISK", "HIGH", "/risk-prediction"
        );

        NotificationAlert a2 = new NotificationAlert(
                farmer1.getId(),
                "⏰ Follow-up Reminder Due Today",
                "It has been 5 days since your Early Blight diagnosis. Upload a new crop leaf image to evaluate whether treatment is working.",
                "FOLLOW_UP_REMINDER", "HIGH", "/follow-up"
        );

        NotificationAlert a3 = new NotificationAlert(
                farmer1.getId(),
                "🚨 Regional Outbreak Warning: Cuttack",
                "37 cases of Tomato Early Blight have been reported within Cuttack district this week. Please check your crop and exercise field sanitation.",
                "OUTBREAK_WARNING", "HIGH", "/outbreak-map"
        );

        alertRepository.saveAll(List.of(a1, a2, a3));
    }
}
