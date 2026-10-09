package com.krishisathi.rental.controller;

import com.krishisathi.rental.dto.ListingWithDistanceDto;
import com.krishisathi.rental.model.EquipmentBooking;
import com.krishisathi.rental.model.EquipmentListing;
import com.krishisathi.rental.service.RentalMarketplaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rentals")
@CrossOrigin(origins = "*")
public class RentalController {

    private final RentalMarketplaceService rentalService;

    public RentalController(RentalMarketplaceService rentalService) {
        this.rentalService = rentalService;
    }

    @GetMapping("/listings")
    public ResponseEntity<List<ListingWithDistanceDto>> getListings(
            @RequestParam(name = "lat", required = false) Double lat,
            @RequestParam(name = "lon", required = false) Double lon,
            @RequestParam(name = "category", required = false) String category) {
        return ResponseEntity.ok(rentalService.searchListings(lat, lon, category));
    }

    @PostMapping("/listings")
    public ResponseEntity<EquipmentListing> createListing(@RequestBody EquipmentListing listing) {
        return ResponseEntity.ok(rentalService.createListing(listing));
    }

    @PostMapping("/bookings")
    public ResponseEntity<EquipmentBooking> createBooking(@RequestBody EquipmentBooking booking) {
        return ResponseEntity.ok(rentalService.createBooking(booking));
    }

    @GetMapping("/bookings/renter/{phone}")
    public ResponseEntity<List<EquipmentBooking>> getBookings(@PathVariable("phone") String phone) {
        return ResponseEntity.ok(rentalService.getBookingsByRenter(phone));
    }
}
