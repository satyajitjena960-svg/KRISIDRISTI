package com.krishisathi.rental.dto;

import com.krishisathi.rental.model.EquipmentListing;

public class ListingWithDistanceDto {
    private EquipmentListing listing;
    private double distanceKm;
    private String formattedDistance;

    public ListingWithDistanceDto() {}

    public ListingWithDistanceDto(EquipmentListing listing, double distanceKm) {
        this.listing = listing;
        this.distanceKm = Math.round(distanceKm * 10.0) / 10.0;
        if (distanceKm < 1.0) {
            this.formattedDistance = Math.round(distanceKm * 1000) + " m away";
        } else {
            this.formattedDistance = String.format("%.1f km away", distanceKm);
        }
    }

    public EquipmentListing getListing() { return listing; }
    public void setListing(EquipmentListing listing) { this.listing = listing; }
    public double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(double distanceKm) { this.distanceKm = distanceKm; }
    public String getFormattedDistance() { return formattedDistance; }
    public void setFormattedDistance(String formattedDistance) { this.formattedDistance = formattedDistance; }
}
