package com.krishisathi.crop.service;

import com.krishisathi.crop.dto.CropGuidanceDto;
import com.krishisathi.crop.dto.CropGuidanceDto.DailyTask;
import com.krishisathi.crop.dto.CropGuidanceDto.FertilizerRecommendation;
import com.krishisathi.crop.model.FarmerCrop;
import com.krishisathi.crop.repository.FarmerCropRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class CropGuidanceService {

    private final FarmerCropRepository repository;

    public CropGuidanceService(FarmerCropRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seedDemoCrop() {
        if (repository.count() == 0) {
            FarmerCrop crop = new FarmerCrop(
                    "9876543210",
                    "Wheat",
                    "Sharbati Gold",
                    LocalDate.now().minusDays(25),
                    3.5,
                    "Loamy"
            );
            repository.save(crop);
        }
    }

    public FarmerCrop saveCrop(FarmerCrop crop) {
        return repository.save(crop);
    }

    public List<FarmerCrop> getCropsByFarmer(String phone) {
        return repository.findByFarmerPhone(phone);
    }

    public void deleteCrop(Long id) {
        repository.deleteById(id);
    }

    public CropGuidanceDto generateGuidance(Long cropId) {
        FarmerCrop crop = repository.findById(cropId)
                .orElseThrow(() -> new IllegalArgumentException("Crop not found with id: " + cropId));

        long days = ChronoUnit.DAYS.between(crop.getSowingDate(), LocalDate.now());
        if (days < 0) days = 0;

        CropGuidanceDto dto = new CropGuidanceDto();
        dto.setCropId(crop.getId());
        dto.setCropName(crop.getCropName());
        dto.setVariety(crop.getVariety());
        dto.setSowingDate(crop.getSowingDate());
        dto.setDaysSinceSowing(days);
        dto.setLandAreaAcres(crop.getLandAreaAcres());

        List<DailyTask> tasks = new ArrayList<>();
        FertilizerRecommendation fert = new FertilizerRecommendation();

        double acres = crop.getLandAreaAcres() != null ? crop.getLandAreaAcres() : 1.0;

        String cropUpper = crop.getCropName().toUpperCase();

        if (cropUpper.contains("WHEAT") || cropUpper.contains("GEHUN")) {
            if (days <= 20) {
                dto.setCurrentStage("Crown Root Initiation (CRI)");
                dto.setStageProgressPercentage((int) Math.min(100, (days * 100) / 20));
                dto.setNextIrrigationDate(LocalDate.now().plusDays(2).toString());
                dto.setIrrigationStatus("Critical first watering needed at CRI stage (21 days)");

                tasks.add(new DailyTask("First Irrigation (CRI)", "पहला पानी (ताज जड़ अवस्था)", "HIGH",
                        "Crown root initiation stage: Apply 1st light irrigation to promote deep root anchoring."));
                tasks.add(new DailyTask("Broadleaf Weed Scout", "चौड़ी पत्ती वाले खरपतवार की जांच", "MEDIUM",
                        "Check field corners for early broadleaf weed emergence."));

                fert.setName("Urea (Nitrogen) Top Dressing");
                fert.setDosePerAcre("25 kg per acre");
                fert.setTotalDoseRequired(String.format("%.1f kg Urea", 25.0 * acres));
                fert.setApplicationTiming("Broadcast immediately after the first irrigation when soil is damp.");
                fert.setPrecautions("Do not apply when standing water is higher than 2 inches.");

                dto.setAudioGuidanceSummaryHindi("गेहूं की फसल ताज जड़ अवस्था में है। पहले पानी की सिंचाई करें और प्रति एकड़ 25 किलो यूरिया का छिड़काव करें।");
                dto.setAudioGuidanceSummaryEnglish("Wheat is at Crown Root Initiation stage. Apply the crucial first irrigation and top-dress urea at 25 kg per acre.");
            } else if (days <= 45) {
                dto.setCurrentStage("Tillering Stage");
                dto.setStageProgressPercentage((int) Math.min(100, ((days - 20) * 100) / 25));
                dto.setNextIrrigationDate(LocalDate.now().plusDays(10).toString());
                dto.setIrrigationStatus("Soil moisture adequate. Keep vigilant for aphid pests.");

                tasks.add(new DailyTask("Weedicide Spray", "खरपतवार नाशक का छिड़काव", "HIGH",
                        "Apply 2,4-D or Clodinafop propargyl if weed pressure is noticed."));
                tasks.add(new DailyTask("Aphid / Yellow Rust Check", "माहू एवं पीला रतुआ का निरीक्षण", "MEDIUM",
                        "Inspect underside of lower leaves in the morning for rust streaks."));

                fert.setName("Zinc Sulphate & Urea Mix");
                fert.setDosePerAcre("5 kg Zinc Sulphate + 20 kg Urea per acre");
                fert.setTotalDoseRequired(String.format("%.1f kg Zinc Sulphate + %.1f kg Urea", 5.0 * acres, 20.0 * acres));
                fert.setApplicationTiming("During active tillering stage before second watering.");
                fert.setPrecautions("Spray in calm weather, avoiding afternoon sun.");

                dto.setAudioGuidanceSummaryHindi("फसल कल्ले फूटने (टिलरिंग) की अवस्था में है। खरपतवार नियंत्रण करें और पीले रतुआ रोग की जांच करें।");
                dto.setAudioGuidanceSummaryEnglish("Crop is at tillering stage. Control weeds and spray zinc sulphate with urea for vigorous growth.");
            } else if (days <= 85) {
                dto.setCurrentStage("Jointing & Flowering");
                dto.setStageProgressPercentage((int) Math.min(100, ((days - 45) * 100) / 40));
                dto.setNextIrrigationDate(LocalDate.now().plusDays(4).toString());
                dto.setIrrigationStatus("Moisture stress now will reduce spikelet numbers.");

                tasks.add(new DailyTask("Flowering Irrigation", "फूल आने के समय सिंचाई", "HIGH",
                        "Ensure consistent soil moisture; drought now directly impairs ear head formation."));

                fert.setName("NPK 0:52:34 Foliar Spray");
                fert.setDosePerAcre("1.5 kg per acre in 150L water");
                fert.setTotalDoseRequired(String.format("%.1f kg NPK", 1.5 * acres));
                fert.setApplicationTiming("Spray during early morning or late afternoon.");
                fert.setPrecautions("Ensure good water coverage across leaf canopy.");

                dto.setAudioGuidanceSummaryHindi("गेहूं में बालियां निकल रही हैं। नमी बनाए रखें ताकि दाने पुष्ट बनें। 0:52:34 का पर्णीय छिड़काव करें।");
                dto.setAudioGuidanceSummaryEnglish("Flowering stage: maintain sufficient moisture for plump grain formation.");
            } else {
                dto.setCurrentStage("Grain Filling & Maturity");
                dto.setStageProgressPercentage(95);
                dto.setNextIrrigationDate("Stop irrigation 10-14 days before harvest");
                dto.setIrrigationStatus("Stop watering to allow grain hardening and uniform ripening.");

                tasks.add(new DailyTask("Combine Harvester Booking", "कंबाइन हार्वेस्टर की अग्रिम बुकिंग", "HIGH",
                        "Book harvesting machinery early in Rental Marketplace to beat peak season rush."));

                fert.setName("No fertilizer required at maturity");
                fert.setDosePerAcre("0 kg");
                fert.setTotalDoseRequired("None");
                fert.setApplicationTiming("N/A");
                fert.setPrecautions("Do not apply chemicals close to harvest.");

                dto.setAudioGuidanceSummaryHindi("फसल पकने की कगार पर है। पानी बंद कर दें और कटाई के लिए हार्वेस्टर की बुकिंग कर लें।");
                dto.setAudioGuidanceSummaryEnglish("Crop is near maturity. Stop watering and book harvesting equipment in the rental section.");
            }
        } else {
            // General / Rice / Cotton / Pulses / Vegetables Default Profile
            dto.setCurrentStage("Active Vegetative Growth");
            dto.setStageProgressPercentage((int) Math.min(100, (days * 100) / 90));
            dto.setNextIrrigationDate(LocalDate.now().plusDays(5).toString());
            dto.setIrrigationStatus("Check field moisture every 4-5 days.");

            tasks.add(new DailyTask("Field Hoeing & Weeding", "निराई-गुड़ाई एवं खरपतवार रोकथाम", "HIGH",
                    "Aerates the soil and clears competitive weeds around root zone."));
            tasks.add(new DailyTask("Pest Scouting", "कीट एवं रोग निगरानी", "MEDIUM",
                    "Look for sucking pests, leaf curl, or early blight spots."));

            fert.setName("Balanced NPK (19:19:19)");
            fert.setDosePerAcre("10 kg per acre");
            fert.setTotalDoseRequired(String.format("%.1f kg NPK", 10.0 * acres));
            fert.setApplicationTiming("Apply near root zone along irrigation furrows.");
            fert.setPrecautions("Avoid high heat periods.");

            dto.setAudioGuidanceSummaryHindi("आपकी फसल अच्छी बढ़वार पर है। निराई-गुड़ाई करें और संतुलित 19:19:19 खाद का प्रयोग करें।");
            dto.setAudioGuidanceSummaryEnglish("Your crop is growing vigorously. Perform weed removal and apply balanced fertilizer.");
        }

        dto.setDailyTasks(tasks);
        dto.setFertilizerRecommendation(fert);

        return dto;
    }
}
