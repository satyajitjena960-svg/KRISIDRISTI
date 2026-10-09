import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AudioGuideService } from '../../services/audio-guide.service';
import { WeatherService, WeatherAdvisory } from '../../services/weather.service';
import { CropService, FarmerCrop } from '../../services/crop.service';
import { RentalService, ListingWithDistance } from '../../services/rental.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- Welcome Hero Banner -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-green-700 to-teal-800 text-white p-6 sm:p-8 shadow-xl">
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 bg-emerald-600/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-emerald-400/30 mb-2">
              <span>🌾</span> आत्मनिर्भर किसान पोर्टल
            </div>
            <h1 class="text-2xl sm:text-4xl font-black">नमस्ते, {{ authService.currentUser()?.fullName || 'किसान भाई' }}!</h1>
            <p class="text-sm sm:text-base text-emerald-100 mt-1 max-w-xl">
              आज का मौसम अनुकूल है। अपनी फसलों की स्थिति और नजदीकी किराए की मशीनों का विवरण नीचे देखें।
            </p>
          </div>

          <!-- Low-Literacy Audio Button -->
          <button
            (click)="listenDailyOverview()"
            class="self-start md:self-center flex items-center gap-3 px-5 py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-black rounded-2xl shadow-lg shadow-black/20 transition-all text-sm">
            <span class="text-2xl">🔊</span>
            <div class="text-left">
              <span class="block leading-none">आज की सलाह सुनें</span>
              <span class="text-[10px] text-slate-800 font-bold opacity-80">Listen Audio Advice</span>
            </div>
          </button>
        </div>

        <!-- Ambient Graphic Background -->
        <div class="absolute -right-8 -bottom-12 opacity-15 pointer-events-none select-none text-9xl">
          🌾🚜
        </div>
      </div>

      <!-- 5 High-Contrast Low-Literacy Action Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <!-- Weather Card -->
        <a routerLink="/weather" class="group p-5 rounded-3xl bg-gradient-to-br from-sky-50 to-blue-100 border-2 border-sky-300/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="flex items-center justify-between mb-3">
            <span class="text-3xl p-2.5 bg-white rounded-2xl shadow-sm">🌦️</span>
            <span class="text-[11px] font-black px-2 py-0.5 rounded-full bg-sky-200 text-sky-800">लाइव</span>
          </div>
          <h2 class="text-lg font-black text-slate-900">मौसम एवं बारिश</h2>
          <p class="text-xs text-slate-600 mt-1">तापमान: {{ weather?.temperature || '28.5' }}°C • छिड़काव सलाह</p>
          <div class="mt-3 flex items-center text-xs font-bold text-sky-800 group-hover:translate-x-1 transition-transform">
            मौसम देखें &rarr;
          </div>
        </a>

        <!-- Crop Schedule Card -->
        <a routerLink="/crop" class="group p-5 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-300/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="flex items-center justify-between mb-3">
            <span class="text-3xl p-2.5 bg-white rounded-2xl shadow-sm">🌱</span>
            <span class="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800">खाद/पानी</span>
          </div>
          <h2 class="text-lg font-black text-slate-900">फसल एवं खाद</h2>
          <p class="text-xs text-slate-600 mt-1">दैनिक कार्य • खाद हिसाब • सिंचाई समय-सारणी</p>
          <div class="mt-3 flex items-center text-xs font-bold text-emerald-800 group-hover:translate-x-1 transition-transform">
            मार्गदर्शन देखें &rarr;
          </div>
        </a>

        <!-- AI Crop Disease Doctor Card -->
        <a routerLink="/disease-detect" class="group p-5 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-100 border-2 border-rose-300/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="flex items-center justify-between mb-3">
            <span class="text-3xl p-2.5 bg-white rounded-2xl shadow-sm">🩺</span>
            <span class="text-[11px] font-black px-2 py-0.5 rounded-full bg-rose-200 text-rose-800">एआई जांच</span>
          </div>
          <h2 class="text-lg font-black text-slate-900">फसल रोग डॉक्टर</h2>
          <p class="text-xs text-slate-600 mt-1">पत्ती फोटो स्कैन • बीमारी व दवा का सटीक उपचार</p>
          <div class="mt-3 flex items-center text-xs font-bold text-rose-800 group-hover:translate-x-1 transition-transform">
            जांच करवाएं &rarr;
          </div>
        </a>

        <!-- Machinery Rental Card -->
        <a routerLink="/rental" class="group p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="flex items-center justify-between mb-3">
            <span class="text-3xl p-2.5 bg-white rounded-2xl shadow-sm">🚜</span>
            <span class="text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">{{ rentals.length }} उपलब्ध</span>
          </div>
          <h2 class="text-lg font-black text-slate-900">यंत्र किराया केंद्र</h2>
          <p class="text-xs text-slate-600 mt-1">ट्रैक्टर, हार्वेस्टर, ड्रोन • 2.4 किमी से शुरू</p>
          <div class="mt-3 flex items-center text-xs font-bold text-amber-800 group-hover:translate-x-1 transition-transform">
            किराए पर लें &rarr;
          </div>
        </a>

        <!-- Voice Assistant Guide Card -->
        <div class="p-5 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-100 border-2 border-purple-300/80 shadow-md">
          <div class="flex items-center justify-between mb-3">
            <span class="text-3xl p-2.5 bg-white rounded-2xl shadow-sm">🎙️</span>
            <span class="text-[11px] font-black px-2 py-0.5 rounded-full bg-purple-200 text-purple-800">वॉयस</span>
          </div>
          <h2 class="text-lg font-black text-slate-900">बोलकर चलाएं</h2>
          <p class="text-xs text-slate-600 mt-1">माइक बटन दबाकर बोलें: "बीमारी", "मौसम", "फसल"</p>
          <div class="mt-3 text-[11px] font-extrabold text-purple-800">
            वॉयस सपोर्ट सक्षम
          </div>
        </div>

      </div>

      <!-- Quick Status Insights Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Live Weather Alert Preview -->
        <div class="p-6 rounded-3xl glass-card bg-white/90 border border-slate-200 shadow-md space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-black text-slate-800 flex items-center gap-2">
              <span>🌦️</span> स्थानीय मौसम एवं अलर्ट (Weather Alert)
            </h3>
            <a routerLink="/weather" class="text-xs font-bold text-emerald-700 hover:underline">विस्तार से देखें</a>
          </div>

          @if (weather) {
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span class="text-3xl font-black text-slate-900">{{ weather.temperature }}°C</span>
                <span class="text-xs text-slate-500 block">{{ weather.conditionDescription }}</span>
              </div>
              <div class="text-right">
                <span class="text-xs font-bold text-slate-700 block">नमी (Humidity): {{ weather.humidity }}%</span>
                <span class="text-xs font-bold text-slate-700 block">हवा (Wind): {{ weather.windSpeedKmH }} km/h</span>
              </div>
            </div>

            <!-- Agricultural Spray Advisory Pill -->
            <div class="p-3.5 rounded-2xl" [ngClass]="weather.sprayAdvisory === 'SAFE' ? 'bg-emerald-50 border border-emerald-300 text-emerald-900' : 'bg-amber-50 border border-amber-300 text-amber-900'">
              <p class="text-xs font-extrabold flex items-center gap-2">
                <span>{{ weather.sprayAdvisory === 'SAFE' ? '✅' : '⚠️' }}</span>
                छिड़काव सलाह: {{ weather.sprayAdvisory === 'SAFE' ? 'कीटनाशक व खाद छिड़काव के लिए अनुकूल समय है।' : 'बारिश या तेज हवा के कारण छिड़काव टालें।' }}
              </p>
            </div>
          }
        </div>

        <!-- Nearby Machinery Highlights -->
        <div class="p-6 rounded-3xl glass-card bg-white/90 border border-slate-200 shadow-md space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-black text-slate-800 flex items-center gap-2">
              <span>🚜</span> नजदीकी उपलब्ध कृषि यंत्र (Nearby Machines)
            </h3>
            <a routerLink="/rental" class="text-xs font-bold text-emerald-700 hover:underline">सभी देखें ({{ rentals.length }})</a>
          </div>

          <div class="space-y-3">
            @for (item of rentals.slice(0, 2); track item.listing.id) {
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 class="font-extrabold text-sm text-slate-900">{{ item.listing.title }}</h4>
                  <p class="text-xs text-slate-500">📍 {{ item.formattedDistance }} • {{ item.listing.ownerName }}</p>
                </div>
                <div class="text-right">
                  <span class="text-sm font-black text-emerald-700">₹{{ item.listing.hourlyRate }}/घंटा</span>
                  <span class="text-[11px] text-slate-500 block">₹{{ item.listing.dailyRate }}/दिन</span>
                </div>
              </div>
            }
          </div>
        </div>

      </div>

    </div>
  `
})
export class DashboardComponent implements OnInit {
  weather: WeatherAdvisory | null = null;
  rentals: ListingWithDistance[] = [];
  crops: FarmerCrop[] = [];

  constructor(
    public authService: AuthService,
    private audioGuide: AudioGuideService,
    private weatherService: WeatherService,
    private rentalService: RentalService,
    private cropService: CropService
  ) {}

  ngOnInit(): void {
    this.weatherService.getCurrentLocation().then(loc => {
      this.weatherService.getWeather(loc.lat, loc.lon).subscribe(w => this.weather = w);
      this.rentalService.getListings(loc.lat, loc.lon).subscribe(r => this.rentals = r);
    });

    const phone = this.authService.currentUser()?.phoneNumber || '9876543210';
    this.cropService.getCrops(phone).subscribe(c => this.crops = c);
  }

  listenDailyOverview(): void {
    const text = 'नमस्ते किसान भाई! कृषि साथी में आपका स्वागत है। आज का मौसम खेती के लिए अनुकूल है। तापमान अठाईस डिग्री है और छिड़काव करना सुरक्षित है। आपकी गेहूं की फसल को अगले पांच दिनों में पानी की आवश्यकता होगी। नजदीकी उपकरण बाजार में ट्रैक्टर और हार्वेस्टर किराए के लिए उपलब्ध हैं।';
    this.audioGuide.speak(text);
  }
}
