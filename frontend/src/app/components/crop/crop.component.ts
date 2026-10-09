import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CropService, FarmerCrop, CropGuidance } from '../../services/crop.service';
import { AuthService } from '../../services/auth.service';
import { AudioGuideService } from '../../services/audio-guide.service';

@Component({
  selector: 'app-crop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            🌱 फसल एवं उत्पादन गाइड (Crop Production Guidance)
          </span>
          <h1 class="text-3xl font-black text-slate-900 mt-2">दैनिक फसल कार्य एवं खाद अनुसूची</h1>
          <p class="text-sm text-slate-600">बुवाई की तारीख और क्षेत्रफल के अनुसार सटीक खेती सलाह</p>
        </div>

        <button
          (click)="showAddCropModal = true"
          class="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold rounded-2xl shadow-lg shadow-green-600/20 transition-all text-sm">
          <span>➕</span> नई फसल जोड़ें (Add Crop)
        </button>
      </div>

      <!-- Crop Selector Tabs -->
      <div class="flex items-center gap-3 overflow-x-auto pb-2">
        @for (crop of crops; track crop.id) {
          <button
            (click)="selectCrop(crop)"
            [class.bg-emerald-700]="selectedCrop?.id === crop.id"
            [class.text-white]="selectedCrop?.id === crop.id"
            [class.shadow-lg]="selectedCrop?.id === crop.id"
            [class.bg-white]="selectedCrop?.id !== crop.id"
            [class.text-slate-800]="selectedCrop?.id !== crop.id"
            class="px-5 py-3 rounded-2xl font-black text-sm whitespace-nowrap border border-slate-200 transition-all flex items-center gap-2">
            <span>🌾</span> {{ crop.cropName }} ({{ crop.landAreaAcres }} एकड़)
          </button>
        }
      </div>

      @if (loadingGuidance) {
        <div class="p-12 text-center rounded-3xl glass-card">
          <div class="animate-spin text-4xl mb-2">⏳</div>
          <p class="font-bold text-slate-600">आपकी फसल का दैनिक मार्गदर्शन तैयार किया जा रहा है...</p>
        </div>
      }

      @if (guidance) {
        <!-- Main Guidance Card -->
        <div class="p-6 sm:p-8 rounded-3xl glass-card bg-white border border-slate-200 shadow-xl space-y-6">
          
          <!-- Top Row: Stage & Days Elapsed -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span class="text-xs font-black uppercase tracking-wider text-emerald-700">वर्तमान अवस्था (Current Stage)</span>
              <h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{{ guidance.currentStage }}</h2>
              <p class="text-xs text-slate-500 mt-1">
                बुवाई तिथि: {{ guidance.sowingDate }} • बुवाई से {{ guidance.daysSinceSowing }} दिन हुए
              </p>
            </div>

            <!-- Audio Guidance Button -->
            <button
              (click)="listenCropGuidance()"
              class="self-start sm:self-center flex items-center gap-2.5 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black rounded-2xl shadow-md transition-all text-sm">
              <span class="text-xl">🔊</span>
              <span>सलाह सुनें (Listen Audio)</span>
            </button>
          </div>

          <!-- Stage Progress Bar -->
          <div>
            <div class="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>अवस्था प्रगति (Stage Progress)</span>
              <span class="text-emerald-700 font-extrabold">{{ guidance.stageProgressPercentage }}%</span>
            </div>
            <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div class="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-500"
                   [style.width.%]="guidance.stageProgressPercentage"></div>
            </div>
            <div class="flex justify-between text-[11px] font-bold text-slate-400 mt-1.5">
              <span>बुवाई (Sowing)</span>
              <span>कल्ले फूटने (Tillering)</span>
              <span>बालियां (Flowering)</span>
              <span>कटाई (Harvest)</span>
            </div>
          </div>

          <!-- Grid: Irrigation Status & Fertilizer Recommendation -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <!-- Irrigation Timeline Box -->
            <div class="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
              <div class="flex items-center gap-2 text-sky-800 font-black text-sm">
                <span class="text-xl">💧</span> सिंचाई समय-सारणी (Watering Timeline)
              </div>
              <p class="text-sm font-bold text-slate-800">अगली सिंचाई: {{ guidance.nextIrrigationDate }}</p>
              <p class="text-xs text-slate-600">{{ guidance.irrigationStatus }}</p>
            </div>

            <!-- Dynamic Fertilizer Recommendation Box -->
            <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div class="flex items-center gap-2 text-emerald-800 font-black text-sm">
                <span class="text-xl">🧪</span> खाद एवं उर्वरक हिसाब (Fertilizer for {{ guidance.landAreaAcres }} Acres)
              </div>
              <p class="text-sm font-bold text-slate-800">{{ guidance.fertilizerRecommendation.name }}</p>
              <p class="text-xs font-extrabold text-emerald-700 bg-white px-3 py-1.5 rounded-xl border border-emerald-300 inline-block">
                कुल मात्रा: {{ guidance.fertilizerRecommendation.totalDoseRequired }}
              </p>
              <p class="text-xs text-slate-600">{{ guidance.fertilizerRecommendation.applicationTiming }}</p>
            </div>

          </div>

          <!-- Daily Tasks List -->
          <div class="space-y-3 pt-4 border-t border-slate-200">
            <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>📋</span> आज के जरूरी कृषि कार्य (Today's Scheduled Tasks)
            </h3>

            <div class="space-y-2.5">
              @for (task of guidance.dailyTasks; track task.title) {
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                  <div>
                    <h4 class="text-sm font-black text-slate-900">{{ task.titleHindi }} ({{ task.title }})</h4>
                    <p class="text-xs text-slate-600 mt-1">{{ task.description }}</p>
                  </div>
                  <span class="text-[11px] font-black uppercase px-2.5 py-1 rounded-full whitespace-nowrap"
                        [ngClass]="task.priority === 'HIGH' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'">
                    {{ task.priority === 'HIGH' ? 'अति आवश्यक' : 'सामान्य' }}
                  </span>
                </div>
              }
            </div>
          </div>

        </div>
      }

      <!-- Add Crop Modal -->
      @if (showAddCropModal) {
        <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-black text-slate-900">नई फसल जोड़ें (Add Crop)</h2>
              <button (click)="showAddCropModal = false" class="text-slate-400 hover:text-slate-700 text-2xl font-bold">✕</button>
            </div>

            <form (ngSubmit)="handleAddCrop()" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">फसल का नाम (Crop Name)</label>
                <select [(ngModel)]="newCrop.cropName" name="cropName" required class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold">
                  <option value="Wheat (गेहूं)">गेहूं (Wheat)</option>
                  <option value="Rice (धान)">धान (Rice / Paddy)</option>
                  <option value="Cotton (कपास)">कपास (Cotton)</option>
                  <option value="Soybean (सोयाबीन)">सोयाबीन (Soybean)</option>
                  <option value="Mustard (सरसों)">सरसों (Mustard)</option>
                  <option value="Maize (मक्का)">मक्का (Maize)</option>
                  <option value="Potato (आलू)">आलू (Potato)</option>
                  <option value="Tomato (टमाटर)">टमाटर (Tomato)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">किस्म (Variety / बीज)</label>
                <input type="text" [(ngModel)]="newCrop.variety" name="variety" placeholder="उदा. शरबती / 1509" class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl" />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">बुवाई की तिथि (Sowing Date)</label>
                  <input type="date" [(ngModel)]="newCrop.sowingDate" name="sowingDate" required class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">खेत का रकबा (Area in Acres)</label>
                  <input type="number" step="0.5" [(ngModel)]="newCrop.landAreaAcres" name="landAreaAcres" required class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">मिट्टी का प्रकार (Soil Type)</label>
                <select [(ngModel)]="newCrop.soilType" name="soilType" class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl">
                  <option value="Loamy (दोमट)">दोमट (Loamy)</option>
                  <option value="Black Soil (काली मिट्टी)">काली मिट्टी (Black Cotton Soil)</option>
                  <option value="Clay (चिकनी मिट्टी)">चिकनी मिट्टी (Clay)</option>
                  <option value="Sandy (रेतीली मिट्टी)">रेतीली मिट्टी (Sandy)</option>
                </select>
              </div>

              <div class="flex gap-3 pt-3">
                <button type="button" (click)="showAddCropModal = false" class="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl">रद्द करें</button>
                <button type="submit" class="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg">फसल सहेजें (Save Crop)</button>
              </div>
            </form>

          </div>
        </div>
      }

    </div>
  `
})
export class CropComponent implements OnInit {
  crops: FarmerCrop[] = [];
  selectedCrop: FarmerCrop | null = null;
  guidance: CropGuidance | null = null;
  loadingGuidance: boolean = false;
  showAddCropModal: boolean = false;

  newCrop: FarmerCrop = {
    farmerPhone: '9876543210',
    cropName: 'Wheat (गेहूं)',
    variety: 'Sharbati Gold',
    sowingDate: new Date().toISOString().split('T')[0],
    landAreaAcres: 3.0,
    soilType: 'Loamy (दोमट)'
  };

  constructor(
    private cropService: CropService,
    private authService: AuthService,
    private audioGuide: AudioGuideService
  ) {}

  ngOnInit(): void {
    const phone = this.authService.currentUser()?.phoneNumber || '9876543210';
    this.newCrop.farmerPhone = phone;

    this.cropService.getCrops(phone).subscribe(crops => {
      this.crops = crops;
      if (crops.length > 0) {
        this.selectCrop(crops[0]);
      }
    });
  }

  selectCrop(crop: FarmerCrop): void {
    this.selectedCrop = crop;
    if (crop.id) {
      this.loadingGuidance = true;
      this.cropService.getGuidance(crop.id).subscribe({
        next: (g) => {
          this.guidance = g;
          this.loadingGuidance = false;
        },
        error: () => this.loadingGuidance = false
      });
    }
  }

  listenCropGuidance(): void {
    if (this.guidance?.audioGuidanceSummaryHindi) {
      this.audioGuide.speak(this.guidance.audioGuidanceSummaryHindi);
    }
  }

  handleAddCrop(): void {
    this.cropService.addCrop(this.newCrop).subscribe({
      next: (saved) => {
        this.crops.push(saved);
        this.selectCrop(saved);
        this.showAddCropModal = false;
      },
      error: () => {
        // Fallback local update
        this.newCrop.id = Date.now();
        this.crops.push({ ...this.newCrop });
        this.selectCrop(this.crops[this.crops.length - 1]);
        this.showAddCropModal = false;
      }
    });
  }
}
