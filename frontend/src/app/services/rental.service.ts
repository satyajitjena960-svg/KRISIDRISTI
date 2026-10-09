import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface EquipmentListing {
  id?: number;
  ownerPhone: string;
  ownerName: string;
  title: string;
  category: string;
  modelDetails?: string;
  hourlyRate: number;
  dailyRate: number;
  locationName: string;
  latitude: number;
  longitude: number;
  contactNumber: string;
  available: boolean;
  imageUrl?: string;
  description?: string;
}

export interface ListingWithDistance {
  listing: EquipmentListing;
  distanceKm: number;
  formattedDistance: string;
}

export interface EquipmentBooking {
  id?: number;
  listingId: number;
  equipmentTitle?: string;
  renterPhone: string;
  renterName: string;
  startDate: string;
  endDate: string;
  totalDays?: number;
  totalEstimatedCost?: number;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'http://localhost:8080/api/rentals';

  constructor(private http: HttpClient) {}

  getListings(lat?: number, lon?: number, category?: string): Observable<ListingWithDistance[]> {
    let url = `${this.apiUrl}/listings`;
    const params: string[] = [];
    if (lat !== undefined) params.push(`lat=${lat}`);
    if (lon !== undefined) params.push(`lon=${lon}`);
    if (category && category !== 'ALL') params.push(`category=${category}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    return this.http.get<ListingWithDistance[]>(url).pipe(
      catchError(() => {
        return of([
          {
            listing: {
              id: 1,
              ownerPhone: '9123456780',
              ownerName: 'Gurpreet Singh',
              title: 'Mahindra 575 DI (45 HP) Tractor',
              category: 'Tractor',
              modelDetails: 'Dual Clutch, Heavy Duty Puddling Tyres',
              hourlyRate: 450,
              dailyRate: 3200,
              locationName: 'Narmada Valley Hub',
              latitude: 22.7580,
              longitude: 78.3610,
              contactNumber: '9123456780',
              available: true,
              description: 'Ploughing, trolley hauling, rotavator attachments. Available with driver.'
            },
            distanceKm: 2.4,
            formattedDistance: '2.4 km away'
          },
          {
            listing: {
              id: 2,
              ownerPhone: '9822334455',
              ownerName: 'Kisan Krishi Seva',
              title: 'John Deere W70 Multi-Crop Combine Harvester',
              category: 'Harvester',
              modelDetails: 'Self-Propelled 100 HP, Straw Chopper',
              hourlyRate: 1400,
              dailyRate: 9500,
              locationName: 'Sohagpur Bypass',
              latitude: 22.7800,
              longitude: 78.4000,
              contactNumber: '9822334455',
              available: true,
              description: 'Wheat and soybean harvesting with less than 1% grain loss.'
            },
            distanceKm: 6.8,
            formattedDistance: '6.8 km away'
          },
          {
            listing: {
              id: 3,
              ownerPhone: '9711889900',
              ownerName: 'AgriDrone Aero Solutions',
              title: 'DJI Agras T40 Agricultural Spraying Drone',
              category: 'Sprayer Drone',
              modelDetails: '40L Spray Tank, Dual Atomized Sprayer',
              hourlyRate: 600,
              dailyRate: 4200,
              locationName: 'Itarsi Krishi Kendra',
              latitude: 22.6100,
              longitude: 78.2800,
              contactNumber: '9711889900',
              available: true,
              description: 'Sprays 10 acres in 40 minutes with certified pilot.'
            },
            distanceKm: 12.5,
            formattedDistance: '12.5 km away'
          }
        ]);
      })
    );
  }

  createListing(listing: EquipmentListing): Observable<EquipmentListing> {
    return this.http.post<EquipmentListing>(`${this.apiUrl}/listings`, listing);
  }

  createBooking(booking: EquipmentBooking): Observable<EquipmentBooking> {
    return this.http.post<EquipmentBooking>(`${this.apiUrl}/bookings`, booking);
  }

  getMyBookings(phone: string): Observable<EquipmentBooking[]> {
    return this.http.get<EquipmentBooking[]>(`${this.apiUrl}/bookings/renter/${phone}`).pipe(
      catchError(() => of([]))
    );
  }
}
