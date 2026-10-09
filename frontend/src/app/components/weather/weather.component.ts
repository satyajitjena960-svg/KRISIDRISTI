import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherAdvisory } from '../../services/weather.service';
import { AudioGuideService } from '../../services/audio-guide.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <!-- Top Section -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            📍 हाइपर-लोकल जीपीएस मौसम (Live GPS Weather)
          </span>
          <h1 class="text-3xl font-black text-slate-900 mt-2">मौसम एवं कृषि सलाह</h1>
          <p class="text-sm text-slate-600">आपके खेत के सटीक स्थान पर आधारित पूर्वानुमान और जरूरी सावधानियां</p>
        </div>

        <!-- Audio Speech Button -->
        @if (weather) {
          <button
            (click)="listenAdvisory()"
            class="flex items-center gap-2.5 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold rounded-2xl shadow-lg shadow-green-600/20 transition-all text-sm">
            <span class="text-xl">🔊</span>
            <span>मौसम सलाह सुनें (Listen Advisory)</span>
          </button>
        }
      </div>

      @if (loading) {
        <div class="p-12 text-center rounded-3xl glass-card">
          <div class="inline-block animate-spin text-4xl mb-3">⏳</div>
          <p class="text-base font-bold text-slate-700">जीपीएस उपग्रह से आपके खेत का मौसम प्राप्त किया जा रहा है...</p>
        </div>
      }

      @if (weather) {
        <!-- Main Weather Metrics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Primary Metric Card -->
          <div class="p-6 rounded-3xl bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-xl flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-sky-200">सटीक स्थान (GPS Location)</span>
              <h2 class="text-2xl font-black mt-1">{{ weather.locationName }}</h2>
              <p class="text-sm text-sky-100 mt-1">{{ weather.conditionDescription }}</p>
            </div>

            <div class="flex items-baseline gap-3 my-6">
              <span class="text-6xl font-black">{{ weather.temperature }}°</span>
              <span class="text-xl font-semibold text-sky-200">C</span>
              <span class="text-xs text-sky-200 font-medium ml-auto">महसूस: {{ weather.feelsLike }}°C</span>
            </div>

            <div class="grid grid-cols-2 gap-2 pt-4 border-t border-sky-400/40 text-xs font-medium">
              <div>💧 नमी: <span class="font-bold">{{ weather.humidity }}%</span></div>
              <div>💨 हवा: <span class="font-bold">{{ weather.windSpeedKmH }} km/h</span></div>
            </div>
          </div>

          <!-- Spray Operations Advisory Card -->
          <div class="p-6 rounded-3xl glass-card border-2 shadow-lg flex flex-col justify-between"
               [ngClass]="weather.sprayAdvisory === 'SAFE' ? 'border-emerald-400 bg-emerald-50/70' : 'border-amber-400 bg-amber-50/70'">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
                      [ngClass]="weather.sprayAdvisory === 'SAFE' ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'">
                  छिड़काव गाइड (Spray Safety)
                </span>
                <span class="text-3xl">{{ weather.sprayAdvisory === 'SAFE' ? '🚜' : '⚠️' }}</span>
              </div>
              <h3 class="text-xl font-black text-slate-900">
                {{ weather.sprayAdvisory === 'SAFE' ? 'छिड़काव के लिए सुरक्षित' : 'छिड़काव स्थगित करें' }}
              </h3>
              <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                {{ weather.sprayAdvisory === 'SAFE' 
                   ? 'हवा की गति एवं धूप अनुकूल है। खरपतवार नाशक एवं कीटनाशक का छिड़काव किया जा सकता है।' 
                   : 'हवा की तेज गति या बारिश की संभावना के कारण दवा बहने का जोखिम है।' }}
              </p>
            </div>

            <div class="mt-4 p-3 rounded-2xl bg-white/80 border border-slate-200 text-xs font-extrabold text-slate-800">
              हवा की गति: {{ weather.windSpeedKmH }} km/h {{ weather.windSpeedKmH > 18 ? '(तेज)' : '(सामान्य)' }}
            </div>
          </div>

          <!-- Irrigation Advisory Card -->
          <div class="p-6 rounded-3xl glass-card border-2 border-sky-300 bg-sky-50/70 shadow-lg flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-200 text-sky-800">
                  सिंचाई सलाह (Irrigation Guide)
                </span>
                <span class="text-3xl">💧</span>
              </div>
              <h3 class="text-xl font-black text-slate-900">सिंचाई की आवश्यकता</h3>
              <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                {{ weather.rainExpectedSoon 
                   ? 'बारिश होने के आसार हैं। नलकूप या मोटर चलाने की आवश्यकता नहीं है।' 
                   : 'मौसम सूखा है। क्यारियों में नमी देखकर केवल आवश्यकतानुसार शाम को पानी दें।' }}
              </p>
            </div>

            <div class="mt-4 p-3 rounded-2xl bg-white/80 border border-slate-200 text-xs font-extrabold text-slate-800">
              बारिश की संभावना: {{ weather.rainExpectedSoon ? 'हाँ (बारिश संभव)' : 'नहीं (मौसम सूखा)' }}
            </div>
          </div>

        </div>

        <!-- Actionable Agricultural Weather Alerts -->
        <div class="p-6 rounded-3xl glass-card bg-white border border-slate-200 shadow-md space-y-4">
          <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
            <span>📢</span> खेत के लिए जरूरी चेतावनियां (Actionable Farm Alerts)
          </h3>

          <div class="space-y-3">
            @for (alert of weather.actionableAlerts; track alert) {
              <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3 text-sm font-semibold text-slate-800">
                <span class="text-lg">📌</span>
                <p class="leading-relaxed">{{ alert }}</p>
              </div>
            }
          </div>
        </div>
      }

    </div>
  `
})
export class WeatherComponent implements OnInit {
  weather: WeatherAdvisory | null = null;
  loading: boolean = true;

  constructor(
    private weatherService: WeatherService,
    private audioGuide: AudioGuideService
  ) {}

  ngOnInit(): void {
    this.weatherService.getCurrentLocation().then(loc => {
      this.weatherService.getWeather(loc.lat, loc.lon).subscribe({
        next: (res) => {
          this.weather = res;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    });
  }

  listenAdvisory(): void {
    if (this.weather?.audioAdvisoryHindi) {
      this.audioGuide.speak(this.weather.audioAdvisoryHindi);
    }
  }
}
