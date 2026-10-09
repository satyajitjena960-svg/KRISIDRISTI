package com.krishisathi.user.service;

import com.krishisathi.user.model.FarmerProfile;
import com.krishisathi.user.repository.FarmerProfileRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class FarmerProfileService {

    private final FarmerProfileRepository repository;

    public FarmerProfileService(FarmerProfileRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seedDefaultFarmer() {
        if (!repository.existsByPhoneNumber("9876543210")) {
            FarmerProfile profile = new FarmerProfile(
                    "9876543210",
                    "Ramesh Patel",
                    "Pipariya",
                    "Hoshangabad",
                    "Madhya Pradesh",
                    4.5,
                    22.7562,
                    78.3582
            );
            profile.setPrimaryCrops("Wheat, Soybean");
            profile.setPreferredLanguage("hi");
            repository.save(profile);
        }
    }

    public FarmerProfile getProfileByPhone(String phoneNumber) {
        return repository.findByPhoneNumber(phoneNumber)
                .orElseGet(() -> {
                    FarmerProfile defaultProfile = new FarmerProfile();
                    defaultProfile.setPhoneNumber(phoneNumber);
                    defaultProfile.setFullName("Kisan Mitra");
                    defaultProfile.setLandAreaAcres(2.0);
                    defaultProfile.setLatitude(20.5937); // India Center fallback
                    defaultProfile.setLongitude(78.9629);
                    return repository.save(defaultProfile);
                });
    }

    public FarmerProfile saveOrUpdateProfile(FarmerProfile profile) {
        Optional<FarmerProfile> existing = repository.findByPhoneNumber(profile.getPhoneNumber());
        if (existing.isPresent()) {
            FarmerProfile p = existing.get();
            if (profile.getFullName() != null) p.setFullName(profile.getFullName());
            if (profile.getVillage() != null) p.setVillage(profile.getVillage());
            if (profile.getDistrict() != null) p.setDistrict(profile.getDistrict());
            if (profile.getState() != null) p.setState(profile.getState());
            if (profile.getLandAreaAcres() != null) p.setLandAreaAcres(profile.getLandAreaAcres());
            if (profile.getPrimaryCrops() != null) p.setPrimaryCrops(profile.getPrimaryCrops());
            if (profile.getLatitude() != null) p.setLatitude(profile.getLatitude());
            if (profile.getLongitude() != null) p.setLongitude(profile.getLongitude());
            if (profile.getPreferredLanguage() != null) p.setPreferredLanguage(profile.getPreferredLanguage());
            p.setUpdatedAt(LocalDateTime.now());
            return repository.save(p);
        } else {
            profile.setUpdatedAt(LocalDateTime.now());
            return repository.save(profile);
        }
    }

    public FarmerProfile updateLocation(String phoneNumber, Double latitude, Double longitude) {
        FarmerProfile profile = getProfileByPhone(phoneNumber);
        profile.setLatitude(latitude);
        profile.setLongitude(longitude);
        profile.setUpdatedAt(LocalDateTime.now());
        return repository.save(profile);
    }
}
