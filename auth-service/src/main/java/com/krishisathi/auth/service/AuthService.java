package com.krishisathi.auth.service;

import com.krishisathi.auth.dto.AuthResponse;
import com.krishisathi.auth.dto.LoginRequest;
import com.krishisathi.auth.dto.RegisterRequest;
import com.krishisathi.auth.model.Role;
import com.krishisathi.auth.model.UserAccount;
import com.krishisathi.auth.repository.UserAccountRepository;
import com.krishisathi.auth.security.JwtUtils;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserAccountRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final RestTemplate restTemplate;

    // In-memory OTP storage: phone -> otp
    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    public AuthService(UserAccountRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.restTemplate = new RestTemplate();
    }

    @PostConstruct
    public void initDefaultUsers() {
        if (!userRepository.existsByPhoneNumber("9876543210")) {
            UserAccount farmer = new UserAccount(
                    "9876543210",
                    "Ramesh Patel",
                    passwordEncoder.encode("password123"),
                    Role.ROLE_FARMER,
                    "hi"
            );
            farmer.setEmail("ramesh@krishisathi.org");
            userRepository.save(farmer);
            log.info("Initialized default demo farmer: 9876543210 / password123");
        }

        if (!userRepository.existsByPhoneNumber("9123456780")) {
            UserAccount provider = new UserAccount(
                    "9123456780",
                    "Kisan Equipment Hub",
                    passwordEncoder.encode("password123"),
                    Role.ROLE_EQUIPMENT_OWNER,
                    "hi"
            );
            provider.setEmail("hub@krishisathi.org");
            userRepository.save(provider);
            log.info("Initialized default demo equipment owner: 9123456780 / password123");
        }
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone number already registered: " + request.getPhoneNumber());
        }

        UserAccount user = new UserAccount(
                request.getPhoneNumber(),
                request.getFullName(),
                passwordEncoder.encode(request.getPassword()),
                request.getRole() != null ? request.getRole() : Role.ROLE_FARMER,
                request.getPreferredLanguage() != null ? request.getPreferredLanguage() : "hi"
        );
        user.setEmail(request.getEmail());

        UserAccount savedUser = userRepository.save(user);

        // Sync to user_db (user-service)
        syncProfileToUserService(
                savedUser.getPhoneNumber(),
                savedUser.getFullName(),
                request.getVillage(),
                request.getDistrict(),
                request.getLandAreaAcres(),
                request.getPrimaryCrops()
        );

        String token = jwtUtils.generateToken(savedUser.getId(), savedUser.getPhoneNumber(), savedUser.getRole().name());

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getPhoneNumber(),
                savedUser.getFullName(),
                savedUser.getRole(),
                savedUser.getPreferredLanguage(),
                "Registration successful"
        );
    }

    public AuthResponse login(LoginRequest request) {
        UserAccount user = userRepository.findByPhoneNumber(request.getPhoneNumber())
                .orElseThrow(() -> new IllegalArgumentException("Invalid phone number or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid phone number or password");
        }

        String token = jwtUtils.generateToken(user.getId(), user.getPhoneNumber(), user.getRole().name());
        return new AuthResponse(
                token,
                user.getId(),
                user.getPhoneNumber(),
                user.getFullName(),
                user.getRole(),
                user.getPreferredLanguage(),
                "Login successful"
        );
    }

    public String sendOtp(String phoneNumber) {
        String otp = String.format("%06d", new Random().nextInt(1000000));
        otpStorage.put(phoneNumber, otp);

        log.info("=================================================");
        log.info("KRISHISATHI OTP for [{}]: {}", phoneNumber, otp);
        log.info("=================================================");

        return "OTP sent successfully to " + phoneNumber + " (Simulated code: " + otp + " or use universal test OTP 123456)";
    }

    public AuthResponse verifyOtp(String phoneNumber, String otp) {
        String cachedOtp = otpStorage.get(phoneNumber);
        boolean isValid = "123456".equals(otp) || (cachedOtp != null && cachedOtp.equals(otp));

        if (!isValid) {
            throw new IllegalArgumentException("Invalid OTP code");
        }

        otpStorage.remove(phoneNumber);

        // Auto-register or fetch existing user in auth_db
        UserAccount user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseGet(() -> {
                    UserAccount newUser = new UserAccount(
                            phoneNumber,
                            "Farmer " + phoneNumber.substring(Math.max(0, phoneNumber.length() - 4)),
                            passwordEncoder.encode("otp_login_default"),
                            Role.ROLE_FARMER,
                            "hi"
                    );
                    return userRepository.save(newUser);
                });

        // Ensure synced into user_db
        syncProfileToUserService(user.getPhoneNumber(), user.getFullName(), "Local Farmland", "Kisan Belt", 2.0, "Wheat");

        String token = jwtUtils.generateToken(user.getId(), user.getPhoneNumber(), user.getRole().name());
        return new AuthResponse(
                token,
                user.getId(),
                user.getPhoneNumber(),
                user.getFullName(),
                user.getRole(),
                user.getPreferredLanguage(),
                "OTP verification successful"
        );
    }

    private void syncProfileToUserService(String phone, String name, String village, String district, Double landArea, String primaryCrops) {
        try {
            Map<String, Object> profile = new HashMap<>();
            profile.put("phoneNumber", phone);
            profile.put("fullName", name != null ? name : "Farmer " + phone);
            profile.put("village", village != null ? village : "Local Village");
            profile.put("district", district != null ? district : "Farmland");
            profile.put("state", "India");
            profile.put("landAreaAcres", landArea != null ? landArea : 2.0);
            profile.put("primaryCrops", primaryCrops != null ? primaryCrops : "Wheat");
            profile.put("latitude", 20.2961);
            profile.put("longitude", 85.8245);
            restTemplate.postForObject("http://localhost:8082/api/users/profile", profile, String.class);
            log.info("Successfully synced user profile to user_db for {}", phone);
        } catch (Exception e) {
            log.warn("Could not sync to user_db (user-service might still be booting): {}", e.getMessage());
        }
    }

    public UserAccount getProfileByPhone(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
