package com.krishisathi.rental.service;

import com.krishisathi.rental.dto.ListingWithDistanceDto;
import com.krishisathi.rental.model.EquipmentBooking;
import com.krishisathi.rental.model.EquipmentListing;
import com.krishisathi.rental.repository.EquipmentBookingRepository;
import com.krishisathi.rental.repository.EquipmentListingRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RentalMarketplaceService {

    private final EquipmentListingRepository listingRepository;
    private final EquipmentBookingRepository bookingRepository;

    public RentalMarketplaceService(EquipmentListingRepository listingRepository,
                                    EquipmentBookingRepository bookingRepository) {
        this.listingRepository = listingRepository;
        this.bookingRepository = bookingRepository;
    }

    @PostConstruct
    public void seedDefaultEquipment() {
        if (listingRepository.count() == 0) {
            listingRepository.save(new EquipmentListing(
                    "9123456780",
                    "Gurpreet Singh",
                    "Mahindra 575 DI (45 HP) with Dual Clutch",
                    "Tractor",
                    "Mahindra 575 DI Sarpanch, 4 Cylinder, Heavy Duty Puddling Tyres",
                    450.0,
                    3200.0,
                    "Narmada Valley Hub (2.4 km from town)",
                    22.7580,
                    78.3610,
                    "9123456780",
                    "assets/images/tractor.jpg",
                    "Available for ploughing, rotavator attachments, and trolley hauling. Driver included if needed."
            ));

            listingRepository.save(new EquipmentListing(
                    "9822334455",
                    "Kisan Krishi Seva",
                    "John Deere W70 Multi-Crop Combine Harvester",
                    "Harvester",
                    "Self-Propelled 100 HP, Grain Tank 2400L, Straw chopper attached",
                    1400.0,
                    9500.0,
                    "Sohagpur Bypass (6.8 km away)",
                    22.7800,
                    78.4000,
                    "9822334455",
                    "assets/images/harvester.jpg",
                    "Perfect for wheat, paddy, soybean harvesting with minimal grain loss (<1%)."
            ));

            listingRepository.save(new EquipmentListing(
                    "9411223344",
                    "Devendra Verma",
                    "Shaktiman Rotary Tiller (Rotavator 7 Feet)",
                    "Rotavator",
                    "48 Blades, L-Type, Boron Steel Blades",
                    300.0,
                    2000.0,
                    "Bankhedi Road (4.1 km away)",
                    22.7400,
                    78.3300,
                    "9411223344",
                    "assets/images/rotavator.jpg",
                    "Fine seedbed preparation in single pass. Compatible with 40-55 HP tractors."
            ));

            listingRepository.save(new EquipmentListing(
                    "9711889900",
                    "AgriDrone Aero Solutions",
                    "DJI Agras T40 Agricultural Spraying Drone",
                    "Sprayer Drone",
                    "40L Spray Tank, 50kg Spreading Payload, Dual Atomized Centrifugal Sprayer",
                    600.0,
                    4200.0,
                    "Itarsi Krishi Vigyan Kendra (12.5 km away)",
                    22.6100,
                    78.2800,
                    "9711889900",
                    "assets/images/drone.jpg",
                    "Foliar fertilizer and pesticide spraying over 10 acres in under 1 hour. DGCA certified pilot provided."
            ));
        }
    }

    public List<ListingWithDistanceDto> searchListings(Double farmerLat, Double farmerLon, String category) {
        double currentLat = (farmerLat != null && farmerLat != 0.0) ? farmerLat : 22.7562;
        double currentLon = (farmerLon != null && farmerLon != 0.0) ? farmerLon : 78.3582;

        List<EquipmentListing> listings;
        if (category != null && !category.trim().isEmpty() && !"ALL".equalsIgnoreCase(category)) {
            listings = listingRepository.findByCategoryIgnoreCase(category);
        } else {
            listings = listingRepository.findAll();
        }

        return listings.stream()
                .map(item -> {
                    double itemLat = (item.getLatitude() != null) ? item.getLatitude() : 22.7562;
                    double itemLon = (item.getLongitude() != null) ? item.getLongitude() : 78.3582;
                    double dist = calculateHaversineDistance(currentLat, currentLon, itemLat, itemLon);
                    return new ListingWithDistanceDto(item, dist);
                })
                .sorted(Comparator.comparingDouble(ListingWithDistanceDto::getDistanceKm))
                .collect(Collectors.toList());
    }

    public EquipmentListing createListing(EquipmentListing listing) {
        if (listing.getLatitude() == null || listing.getLatitude() == 0.0) {
            listing.setLatitude(22.7562);
        }
        if (listing.getLongitude() == null || listing.getLongitude() == 0.0) {
            listing.setLongitude(78.3582);
        }
        if (listing.getOwnerName() == null || listing.getOwnerName().trim().isEmpty()) {
            listing.setOwnerName("किसान मित्र (Farmer)");
        }
        if (listing.getContactNumber() == null || listing.getContactNumber().trim().isEmpty()) {
            listing.setContactNumber(listing.getOwnerPhone() != null ? listing.getOwnerPhone() : "9876543210");
        }
        if (listing.getOwnerPhone() == null || listing.getOwnerPhone().trim().isEmpty()) {
            listing.setOwnerPhone(listing.getContactNumber());
        }
        if (listing.getDailyRate() == null || listing.getDailyRate() == 0.0) {
            listing.setDailyRate(listing.getHourlyRate() != null ? listing.getHourlyRate() * 8.0 : 2500.0);
        }
        if (listing.getHourlyRate() == null || listing.getHourlyRate() == 0.0) {
            listing.setHourlyRate(listing.getDailyRate() != null ? listing.getDailyRate() / 8.0 : 350.0);
        }
        if (listing.getLocationName() == null || listing.getLocationName().trim().isEmpty()) {
            listing.setLocationName("स्थानीय कृषि मंडी (Local Mandi)");
        }
        listing.setAvailable(true);
        listing.setCreatedAt(LocalDateTime.now());
        return listingRepository.save(listing);
    }

    public EquipmentBooking createBooking(EquipmentBooking booking) {
        EquipmentListing listing = listingRepository.findById(booking.getListingId())
                .orElseThrow(() -> new IllegalArgumentException("Equipment not found"));

        booking.setEquipmentTitle(listing.getTitle());

        long days = ChronoUnit.DAYS.between(booking.getStartDate(), booking.getEndDate()) + 1;
        if (days <= 0) days = 1;
        booking.setTotalDays((int) days);
        double rate = (listing.getDailyRate() != null) ? listing.getDailyRate() : 2000.0;
        booking.setTotalEstimatedCost(days * rate);
        booking.setStatus("CONFIRMED");

        return bookingRepository.save(booking);
    }

    public List<EquipmentBooking> getBookingsByRenter(String renterPhone) {
        return bookingRepository.findByRenterPhone(renterPhone);
    }

    private double calculateHaversineDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Earth radius in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
