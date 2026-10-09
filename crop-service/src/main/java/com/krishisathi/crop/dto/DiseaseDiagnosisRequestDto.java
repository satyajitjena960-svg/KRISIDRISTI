package com.krishisathi.crop.dto;

public class DiseaseDiagnosisRequestDto {
    private String farmerPhone;
    private String cropName; // e.g. "Wheat", "Tomato", "Rice", "Cotton", "Potato", "Soybean"
    private String imageBase64;
    private String observedSymptoms; // e.g. "Yellow spots on leaves", "Black spots", "Curled leaves"

    public String getFarmerPhone() { return farmerPhone; }
    public void setFarmerPhone(String farmerPhone) { this.farmerPhone = farmerPhone; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public String getImageBase64() { return imageBase64; }
    public void setImageBase64(String imageBase64) { this.imageBase64 = imageBase64; }
    public String getObservedSymptoms() { return observedSymptoms; }
    public void setObservedSymptoms(String observedSymptoms) { this.observedSymptoms = observedSymptoms; }
}
