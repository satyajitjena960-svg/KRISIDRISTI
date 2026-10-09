package com.krishisathi.user.controller;

import com.krishisathi.user.model.FarmerProfile;
import com.krishisathi.user.service.FarmerProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class FarmerProfileController {

    private final FarmerProfileService service;

    public FarmerProfileController(FarmerProfileService service) {
        this.service = service;
    }

    @GetMapping("/profile/{phoneNumber}")
    public ResponseEntity<FarmerProfile> getProfile(@PathVariable("phoneNumber") String phoneNumber) {
        return ResponseEntity.ok(service.getProfileByPhone(phoneNumber));
    }

    @PostMapping("/profile")
    public ResponseEntity<FarmerProfile> saveProfile(@RequestBody FarmerProfile profile) {
        return ResponseEntity.ok(service.saveOrUpdateProfile(profile));
    }

    @PutMapping("/profile/{phoneNumber}")
    public ResponseEntity<FarmerProfile> updateProfile(@PathVariable("phoneNumber") String phoneNumber, @RequestBody FarmerProfile profile) {
        profile.setPhoneNumber(phoneNumber);
        return ResponseEntity.ok(service.saveOrUpdateProfile(profile));
    }

    @PutMapping("/profile/{phoneNumber}/location")
    public ResponseEntity<FarmerProfile> updateLocation(@PathVariable("phoneNumber") String phoneNumber, @RequestBody Map<String, Double> coords) {
        Double lat = coords.get("latitude");
        Double lon = coords.get("longitude");
        if (lat == null || lon == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(service.updateLocation(phoneNumber, lat, lon));
    }
}
