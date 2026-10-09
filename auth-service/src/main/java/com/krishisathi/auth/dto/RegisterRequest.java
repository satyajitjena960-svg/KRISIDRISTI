package com.krishisathi.auth.dto;

import com.krishisathi.auth.model.Role;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Password is required")
    private String password;

    private String email;
    private Role role = Role.ROLE_FARMER;
    private String preferredLanguage = "hi";

    private String village;
    private String district;
    private Double landAreaAcres;
    private String primaryCrops;

    public RegisterRequest() {}

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public Double getLandAreaAcres() { return landAreaAcres; }
    public void setLandAreaAcres(Double landAreaAcres) { this.landAreaAcres = landAreaAcres; }

    public String getPrimaryCrops() { return primaryCrops; }
    public void setPrimaryCrops(String primaryCrops) { this.primaryCrops = primaryCrops; }
}
