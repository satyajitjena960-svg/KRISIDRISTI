package com.smartcrop.dto;

public class DiagnosisRequestDto {
    private Long farmerId;
    private Long farmPlotId;
    private String cropType;
    private String district;
    private String village;
    private String notes;
    private String imageBase64;

    public DiagnosisRequestDto() {}

    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }

    public Long getFarmPlotId() { return farmPlotId; }
    public void setFarmPlotId(Long farmPlotId) { this.farmPlotId = farmPlotId; }

    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getImageBase64() { return imageBase64; }
    public void setImageBase64(String imageBase64) { this.imageBase64 = imageBase64; }
}
