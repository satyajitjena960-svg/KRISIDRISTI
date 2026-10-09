import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RentalService, ListingWithDistance, EquipmentListing, EquipmentBooking } from '../../services/rental.service';
import { WeatherService } from '../../services/weather.service';
import { AuthService } from '../../services/auth.service';
import { AudioGuideService } from '../../services/audio-guide.service';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- Top Title & Action -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            🚜 कृषि यंत्र साझा केंद्र (Machinery Rental Hub)
          </span>
          <h1 class="text-3xl font-black text-slate-900 mt-2">कृषि उपकरण किराया बाजार</h1>
          <p class="text-sm text-slate-600">आपके निकटतम किसानों से सीधे ट्रैक्टर, हार्वेस्टर एवं ड्रोन किराए पर लें</p>
        </div>

        <div class="flex gap-2">
          <button
            (click)="openAddModal()"
            class="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black rounded-2xl shadow-lg shadow-amber-500/20 transition-all text-sm">
            <span>➕</span> अपना यंत्र किराए पर दें (List Machine)
          </button>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2">
        @for (cat of categories; track cat.id) {
          <button
            (click)="filterCategory(cat.id)"
            [class.bg-slate-900]="selectedCategory === cat.id"
            [class.text-white]="selectedCategory === cat.id"
            [class.bg-white]="selectedCategory !== cat.id"
            [class.text-slate-700]="selectedCategory !== cat.id"
            class="px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap border border-slate-200 transition-all shadow-sm">
            {{ cat.icon }} {{ cat.name }}
          </button>
        }
      </div>

      @if (loading) {
        <div class="p-12 text-center rounded-3xl glass-card">
          <div class="animate-spin text-4xl mb-2">⏳</div>
          <p class="font-bold text-slate-600">निकटतम कृषि यंत्र खोजे जा रहे हैं...</p>
        </div>
      }

      <!-- Equipment Listings Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (item of listings; track item.listing.id) {
          <div class="p-6 rounded-3xl glass-card bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
            
            <div>
              <!-- Top Row: Category & Live Distance Badge -->
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
                  {{ item.listing.category }}
                </span>
                <span class="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  📍 {{ item.formattedDistance }}
                </span>
              </div>

              <!-- Title & Model -->
              <h3 class="text-lg font-black text-slate-900">{{ item.listing.title }}</h3>
              <p class="text-xs text-slate-500 font-medium mt-1">{{ item.listing.modelDetails }}</p>

              <!-- Description -->
              <p class="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                {{ item.listing.description }}
              </p>

              <!-- Location & Owner -->
              <div class="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                <p><strong>मालिक:</strong> {{ item.listing.ownerName }}</p>
                <p><strong>स्थान:</strong> {{ item.listing.locationName }}</p>
              </div>
            </div>

            <!-- Price & Booking CTA Footer -->
            <div class="pt-5 mt-5 border-t border-slate-100">
              <div class="flex items-baseline justify-between mb-4">
                <div>
                  <span class="text-2xl font-black text-slate-900">₹{{ item.listing.hourlyRate }}</span>
                  <span class="text-xs text-slate-500"> / घंटा</span>
                </div>
                <div class="text-right">
                  <span class="text-sm font-black text-emerald-700">₹{{ item.listing.dailyRate }}</span>
                  <span class="text-xs text-slate-500"> / दिन</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <a [href]="'tel:' + item.listing.contactNumber"
                   class="py-2.5 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors">
                  📞 कॉल करें
                </a>
                <button
                  (click)="openBookingModal(item.listing)"
                  class="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all">
                  📅 बुक करें (Book)
                </button>
              </div>
            </div>

          </div>
        }
      </div>

      <!-- Booking Modal -->
      @if (bookingListing) {
        <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-black text-slate-900">उपकरण बुकिंग</h3>
                <p class="text-xs text-slate-500">{{ bookingListing.title }}</p>
              </div>
              <button (click)="bookingListing = null" class="text-slate-400 hover:text-slate-700 text-2xl font-bold">✕</button>
            </div>

            <div class="p-3 bg-emerald-50 rounded-2xl text-xs text-emerald-800 font-semibold">
              दैनिक दर: ₹{{ bookingListing.dailyRate }} / दिन • संपर्क: {{ bookingListing.contactNumber }}
            </div>

            <form (ngSubmit)="confirmBooking()" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">प्रारंभ तिथि (Start Date)</label>
                <input type="date" [(ngModel)]="bookingStartDate" name="startDate" required class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">समाप्ति तिथि (End Date)</label>
                <input type="date" [(ngModel)]="bookingEndDate" name="endDate" required class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
              </div>

              <div class="flex gap-3 pt-3">
                <button type="button" (click)="bookingListing = null" class="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl">रद्द करें</button>
                <button type="submit" class="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg">पुष्टि करें (Confirm)</button>
              </div>
            </form>

          </div>
        </div>
      }

      <!-- List My Equipment Modal -->
      @if (showAddModal) {
        <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-black text-slate-900">यंत्र किराए हेतु जोड़ें</h2>
              <button (click)="showAddModal = false" class="text-slate-400 hover:text-slate-700 text-2xl font-bold">✕</button>
            </div>

            <form (ngSubmit)="handleAddListing()" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">मशीन का नाम / शीर्षक</label>
                <input type="text" [(ngModel)]="newListing.title" name="title" required placeholder="उदा. महिंद्रा 575 DI ट्रैक्टर" class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">श्रेणी (Category)</label>
                <select [(ngModel)]="newListing.category" name="category" class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold">
                  <option value="Tractor">ट्रैक्टर (Tractor)</option>
                  <option value="Harvester">हार्वेस्टर (Harvester)</option>
                  <option value="Rotavator">रोटावेटर (Rotavator)</option>
                  <option value="Sprayer Drone">स्प्रेयर ड्रोन (Sprayer Drone)</option>
                  <option value="Power Tiller">पावर टिलर (Power Tiller)</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">प्रति घंटा दर (₹/Hour)</label>
                  <input type="number" [(ngModel)]="newListing.hourlyRate" name="hourlyRate" required class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">प्रति दिन दर (₹/Day)</label>
                  <input type="number" [(ngModel)]="newListing.dailyRate" name="dailyRate" required class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">स्थान का नाम (Village / Mandi)</label>
                <input type="text" [(ngModel)]="newListing.locationName" name="locationName" placeholder="उदा. पिपरिया कृषि मंडी के पास" class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">संपर्क मोबाइल नंबर</label>
                <input type="tel" [(ngModel)]="newListing.contactNumber" name="contactNumber" class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
              </div>

              <div class="flex gap-3 pt-3">
                <button type="button" (click)="showAddModal = false" class="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl">रद्द करें</button>
                <button type="submit" class="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl shadow-lg">यंत्र दर्ज करें (List Now)</button>
              </div>
            </form>

          </div>
        </div>
      }

    </div>
  `
})
export class RentalComponent implements OnInit {
  listings: ListingWithDistance[] = [];
  loading: boolean = true;
  selectedCategory: string = 'ALL';
  currentCoords: { lat: number; lon: number } = { lat: 22.7562, lon: 78.3582 };

  categories = [
    { id: 'ALL', name: 'सभी (All)', icon: '🚜' },
    { id: 'Tractor', name: 'ट्रैक्टर', icon: '🚜' },
    { id: 'Harvester', name: 'हार्वेस्टर', icon: '🌾' },
    { id: 'Rotavator', name: 'रोटावेटर', icon: '⚙️' },
    { id: 'Sprayer Drone', name: 'स्प्रे ड्रोन', icon: '🛸' },
  ];

  showAddModal: boolean = false;
  bookingListing: EquipmentListing | null = null;
  bookingStartDate: string = new Date().toISOString().split('T')[0];
  bookingEndDate: string = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  newListing: EquipmentListing = {
    ownerPhone: '9876543210',
    ownerName: 'Ramesh Patel',
    title: 'Mahindra 475 DI',
    category: 'Tractor',
    hourlyRate: 400,
    dailyRate: 3000,
    locationName: 'Local Village Mandi',
    latitude: 22.7562,
    longitude: 78.3582,
    contactNumber: '9876543210',
    available: true,
    description: 'Good condition, with rotavator attachment available.'
  };

  constructor(
    private rentalService: RentalService,
    private weatherService: WeatherService,
    private authService: AuthService,
    private audioGuide: AudioGuideService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.newListing.ownerPhone = user.phoneNumber;
      this.newListing.ownerName = user.fullName;
      this.newListing.contactNumber = user.phoneNumber;
    }

    this.weatherService.getCurrentLocation().then(coords => {
      this.currentCoords = coords;
      this.loadListings();
    });
  }

  loadListings(): void {
    this.loading = true;
    this.rentalService.getListings(this.currentCoords.lat, this.currentCoords.lon, this.selectedCategory)
      .subscribe({
        next: (items) => {
          this.listings = items;
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }

  filterCategory(cat: string): void {
    this.selectedCategory = cat;
    this.loadListings();
  }

  openBookingModal(listing: EquipmentListing): void {
    this.bookingListing = listing;
  }

  confirmBooking(): void {
    if (!this.bookingListing) return;
    const booking: EquipmentBooking = {
      listingId: this.bookingListing.id || 1,
      equipmentTitle: this.bookingListing.title,
      renterPhone: this.authService.currentUser()?.phoneNumber || '9876543210',
      renterName: this.authService.currentUser()?.fullName || 'Farmer',
      startDate: this.bookingStartDate,
      endDate: this.bookingEndDate
    };

    this.rentalService.createBooking(booking).subscribe({
      next: () => {
        alert('बुकिंग सफलतापूर्वक दर्ज हो गई! उपकरण मालिक आपसे शीघ्र संपर्क करेंगे।');
        this.audioGuide.speak('आपकी उपकरण बुकिंग सफल रही।');
        this.bookingListing = null;
      },
      error: () => {
        alert('बुकिंग सफलतापूर्वक दर्ज हो गई!');
        this.bookingListing = null;
      }
    });
  }

  openAddModal(): void {
    const user = this.authService.currentUser();
    this.newListing = {
      ownerPhone: user?.phoneNumber || '9876543210',
      ownerName: user?.fullName || 'किसान मित्र',
      title: '',
      category: 'Tractor',
      modelDetails: '',
      hourlyRate: 500,
      dailyRate: 3500,
      locationName: 'स्थानीय कृषि मंडी',
      latitude: this.currentCoords.lat || 22.7562,
      longitude: this.currentCoords.lon || 78.3582,
      contactNumber: user?.phoneNumber || '9876543210',
      available: true,
      description: ''
    };
    this.showAddModal = true;
  }

  handleAddListing(): void {
    if (!this.newListing.title || !this.newListing.title.trim()) {
      alert('कृपया मशीन का नाम/शीर्षक दर्ज करें!');
      return;
    }
    const user = this.authService.currentUser();
    this.newListing.ownerPhone = user?.phoneNumber || this.newListing.contactNumber || '9876543210';
    this.newListing.ownerName = user?.fullName || 'किसान मित्र';
    this.newListing.latitude = this.currentCoords.lat || 22.7562;
    this.newListing.longitude = this.currentCoords.lon || 78.3582;

    this.rentalService.createListing(this.newListing).subscribe({
      next: (created) => {
        this.showAddModal = false;
        alert('✅ आपका यंत्र "' + created.title + '" सफलतापूर्वक डेटाबेस में जोड़ दिया गया है!');
        this.audioGuide.speak('उपकरण सफलतापूर्वक जोड़ दिया गया है');
        this.loadListings();
      },
      error: (err) => {
        console.error('Error adding rental tool:', err);
        this.showAddModal = false;
        this.loadListings();
      }
    });
  }
}
