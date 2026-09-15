package com.smartcrop.dto;

public class EscalationReviewDto {
    private Long diagnosisId;
    private String verifiedDiseaseName;
    private String expertNotes;
    private String prescribedBiologicalTreatment;
    private String prescribedChemicalTreatment;
    private String urgentActionRequired;

    public EscalationReviewDto() {}

    public Long getDiagnosisId() { return diagnosisId; }
    public void setDiagnosisId(Long diagnosisId) { this.diagnosisId = diagnosisId; }

    public String getVerifiedDiseaseName() { return verifiedDiseaseName; }
    public void setVerifiedDiseaseName(String verifiedDiseaseName) { this.verifiedDiseaseName = verifiedDiseaseName; }

    public String getExpertNotes() { return expertNotes; }
    public void setExpertNotes(String expertNotes) { this.expertNotes = expertNotes; }

    public String getPrescribedBiologicalTreatment() { return prescribedBiologicalTreatment; }
    public void setPrescribedBiologicalTreatment(String prescribedBiologicalTreatment) { this.prescribedBiologicalTreatment = prescribedBiologicalTreatment; }

    public String getPrescribedChemicalTreatment() { return prescribedChemicalTreatment; }
    public void setPrescribedChemicalTreatment(String prescribedChemicalTreatment) { this.prescribedChemicalTreatment = prescribedChemicalTreatment; }

    public String getUrgentActionRequired() { return urgentActionRequired; }
    public void setUrgentActionRequired(String urgentActionRequired) { this.urgentActionRequired = urgentActionRequired; }
}
