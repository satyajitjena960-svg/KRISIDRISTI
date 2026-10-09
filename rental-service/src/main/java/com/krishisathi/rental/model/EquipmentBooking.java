package com.krishisathi.rental.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "equipment_bookings")
public class EquipmentBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long listingId;

    private String equipmentTitle;

    @Column(nullable = false, length = 20)
    private String renterPhone;

    @Column(nullable = false, length = 100)
    private String renterName;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    private int totalDays;
    private Double totalEstimatedCost;

    private String status = "CONFIRMED"; // REQUESTED, CONFIRMED, COMPLETED, CANCELLED

    private LocalDateTime bookedAt = LocalDateTime.now();

    public EquipmentBooking() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getListingId() { return listingId; }
    public void setListingId(Long listingId) { this.listingId = listingId; }
    public String getEquipmentTitle() { return equipmentTitle; }
    public void setEquipmentTitle(String equipmentTitle) { this.equipmentTitle = equipmentTitle; }
    public String getRenterPhone() { return renterPhone; }
    public void setRenterPhone(String renterPhone) { this.renterPhone = renterPhone; }
    public String getRenterName() { return renterName; }
    public void setRenterName(String renterName) { this.renterName = renterName; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public int getTotalDays() { return totalDays; }
    public void setTotalDays(int totalDays) { this.totalDays = totalDays; }
    public Double getTotalEstimatedCost() { return totalEstimatedCost; }
    public void setTotalEstimatedCost(Double totalEstimatedCost) { this.totalEstimatedCost = totalEstimatedCost; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getBookedAt() { return bookedAt; }
    public void setBookedAt(LocalDateTime bookedAt) { this.bookedAt = bookedAt; }
}
