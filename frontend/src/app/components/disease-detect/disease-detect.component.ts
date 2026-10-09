import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CropService, DiseaseDiagnosisResult } from '../../services/crop.service';
import { AuthService } from '../../services/auth.service';
import { AudioGuideService } from '../../services/audio-guide.service';

@Component({
  selector: 'app-disease-detect',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- Top Title -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
            🩺 एआई फसल डॉक्टर (Live AI Crop Doctor & Vision Diagnostics)
          </span>
          <h1 class="text-3xl font-black text-slate-900 mt-2">एआई फसल रोग पहचान एवं उपचार</h1>
          <p class="text-sm text-slate-600">पत्ती की फोटो अपलोड करें — एआई पिक्सल और रंग स्पेक्ट्रम का वास्तविक समय में विश्लेषण करेगा</p>
        </div>

        @if (diagnosisResult) {
          <div class="flex items-center gap-2">
            <button
              (click)="resetScan()"
              class="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl shadow-sm transition-all text-xs sm:text-sm">
              <span>🔄</span> नई फोटो स्कैन करें
            </button>
            <button
              (click)="listenDiagnosis()"
              class="flex items-center gap-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold rounded-2xl shadow-md transition-all text-xs sm:text-sm">
              <span class="text-lg">🔊</span>
              <span>दवा व उपचार सुनें</span>
            </button>
          </div>
        }
      </div>

      <!-- Upload & Symptoms Form -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Column: Input Form (5 cols) -->
        <div class="lg:col-span-5 p-6 rounded-3xl glass-card bg-white border border-slate-200 shadow-xl space-y-5">
          <h3 class="text-base font-black text-slate-900 flex items-center justify-between pb-3 border-b border-slate-100">
            <span class="flex items-center gap-2"><span>📷</span> पत्ती की फोटो अपलोड करें</span>
            @if (imagePreview) {
              <span class="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">फोटो लोड है ✓</span>
            }
          </h3>

          <!-- Crop Selector -->
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">फसल चुनें (Select Crop)</label>
            <select [(ngModel)]="selectedCrop" name="crop" class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800">
              <option value="Wheat (गेहूं)">🌾 गेहूं (Wheat)</option>
              <option value="Rice (धान)">🍚 धान (Rice / Paddy)</option>
              <option value="Tomato (टमाटर)">🍅 टमाटर (Tomato)</option>
              <option value="Potato (आलू)">🥔 आलू (Potato)</option>
              <option value="Cotton (कपास)">☁️ कपास (Cotton)</option>
              <option value="Soybean (सोयाबीन)">🌱 सोयाबीन (Soybean)</option>
            </select>
          </div>

          <!-- Photo Upload & Camera Area -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-bold text-slate-700">रोगग्रस्त पत्ती की फोटो (Leaf Photo)</label>
              <span class="text-[10px] font-semibold text-rose-600">* अनिवार्य (Required)</span>
            </div>
            
            <div
              (dragover)="onDragOver($event)"
              (drop)="onDrop($event)"
              class="relative border-2 border-dashed rounded-2xl p-4 text-center transition-all overflow-hidden"
              [ngClass]="{
                'border-emerald-500 bg-emerald-50/40': imagePreview && !loading,
                'border-rose-400 bg-rose-50/30 ring-2 ring-rose-400/20': loading,
                'border-slate-300 hover:border-emerald-500 bg-slate-50/60': !imagePreview && !loading
              }">
              
              @if (imagePreview) {
                <div class="relative inline-block w-full">
                  <img [src]="imagePreview" alt="Leaf Preview" class="max-h-56 rounded-xl object-contain shadow-md mx-auto" />
                  
                  <!-- Real-time Laser Scanner Beam Animation -->
                  @if (loading) {
                    <div class="absolute inset-0 bg-emerald-500/10 rounded-xl overflow-hidden pointer-events-none">
                      <div class="w-full h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-pulse absolute top-1/2 -translate-y-1/2"></div>
                      <div class="absolute inset-0 flex items-center justify-center">
                        <span class="px-3 py-1.5 bg-slate-900/80 backdrop-blur-md text-emerald-300 text-xs font-black rounded-full border border-emerald-500/40 animate-pulse">
                          🔬 एआई पिक्सल स्कैनिंग जारी है...
                        </span>
                      </div>
                    </div>
                  }

                  @if (!loading) {
                    <button
                      (click)="imagePreview = ''"
                      type="button"
                      class="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow-md transition-transform hover:scale-110">
                      ✕
                    </button>
                  }
                </div>
              } @else {
                <div class="py-8 space-y-2 cursor-pointer">
                  <span class="text-5xl block animate-bounce">🍃</span>
                  <p class="text-xs font-black text-slate-700">पत्ती की फोटो अपलोड करें या खींचें</p>
                  <p class="text-[11px] text-slate-500">फोटो यहां खींचकर लाएं (Drag & Drop) या क्लिक करें</p>
                  <span class="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-lg border border-emerald-300">
                    📷 कैमरा / गैलरी से चुनें
                  </span>
                </div>
              }

              @if (!loading) {
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  (change)="onFileSelected($event)"
                  class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              }
            </div>
          </div>

          <!-- Observed Symptoms Input (Optional) -->
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">
              लक्षण या अतिरिक्त विवरण (वैकल्पिक / Optional)
            </label>
            <textarea
              [(ngModel)]="symptomsText"
              rows="2"
              placeholder="यदि कोई विशेष लक्षण दिखे तो यहां लिखें (उदा. पीली धारियां, काले छल्ले, पत्ती मुड़ना...)"
              class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800"></textarea>
          </div>

          <!-- Symptom Quick Tags -->
          <div>
            <span class="text-[11px] font-bold text-slate-500 block mb-1.5">त्वरित लक्षण टैग (क्लिक करके जोड़ें):</span>
            <div class="flex flex-wrap gap-1.5">
              @for (tag of quickTags; track tag) {
                <button
                  type="button"
                  (click)="appendTag(tag)"
                  class="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 rounded-lg text-[11px] font-bold border border-slate-200 transition-all">
                  + {{ tag }}
                </button>
              }
            </div>
          </div>

          <!-- Diagnose CTA -->
          <button
            (click)="runDiagnosis()"
            [disabled]="loading"
            class="w-full py-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-green-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            @if (loading) {
              <span class="animate-spin text-xl">⏳</span>
              <span>वास्तविक समय में फोटो का विश्लेषण हो रहा है...</span>
            } @else {
              <span class="text-lg">🔍</span>
              <span>एआई से रोग की जांच करें (Scan & Diagnose)</span>
            }
          </button>
        </div>

        <!-- Right Column: Diagnosis & Treatment Results (7 cols) -->
        <div class="lg:col-span-7 space-y-6">
          @if (diagnosisResult) {
            
            <!-- Result Main Card -->
            <div class="p-6 sm:p-8 rounded-3xl glass-card bg-white border-2 border-emerald-400 shadow-xl space-y-6 animate-fadeIn">
              
              <!-- Result Header -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span
                      class="text-xs font-black uppercase px-2.5 py-1 rounded-full border"
                      [ngClass]="{
                        'bg-emerald-100 text-emerald-800 border-emerald-200': diagnosisResult.severity === 'HEALTHY',
                        'bg-amber-100 text-amber-800 border-amber-200': diagnosisResult.severity === 'MODERATE' || diagnosisResult.severity === 'LOW',
                        'bg-rose-100 text-rose-800 border-rose-200': diagnosisResult.severity === 'HIGH' || diagnosisResult.severity === 'CRITICAL'
                      }">
                      गंभीरता: {{ diagnosisResult.severity }}
                    </span>
                    <span class="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      एआई सटीकता: {{ diagnosisResult.confidencePercentage }}%
                    </span>
                  </div>
                  <h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    {{ diagnosisResult.diseaseHindiName }}
                  </h2>
                  <p class="text-xs text-slate-500 font-semibold">{{ diagnosisResult.diseaseName }} • {{ diagnosisResult.cropName }}</p>
                </div>
              </div>

              <!-- Real-Time AI Computer Vision Telemetry -->
              @if (diagnosisResult.healthyTissuePercentage !== undefined && diagnosisResult.healthyTissuePercentage !== null) {
                <div class="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-inner space-y-3">
                  <div class="flex items-center justify-between text-xs font-bold text-emerald-400">
                    <span class="flex items-center gap-1.5">
                      <span>🔬</span> वास्तविक समय इमेज स्पेक्ट्रम टेलीमेट्री (Vision Telemetry)
                    </span>
                    @if (diagnosisResult.imageResolution) {
                      <span class="text-[10px] text-slate-400 font-mono">{{ diagnosisResult.imageResolution }}</span>
                    }
                  </div>

                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div class="p-2.5 rounded-xl bg-white/10 border border-white/10">
                      <span class="text-[10px] text-slate-300 block font-medium">स्वस्थ क्लोरोफिल (Healthy)</span>
                      <span class="text-lg font-black text-emerald-400">{{ diagnosisResult.healthyTissuePercentage }}%</span>
                    </div>

                    <div class="p-2.5 rounded-xl bg-white/10 border border-white/10">
                      <span class="text-[10px] text-slate-300 block font-medium">रोगग्रस्त क्षेत्र (Affected)</span>
                      <span
                        class="text-lg font-black"
                        [ngClass]="(diagnosisResult.affectedAreaPercentage || 0) > 20 ? 'text-rose-400' : 'text-amber-400'">
                        {{ diagnosisResult.affectedAreaPercentage }}%
                      </span>
                    </div>

                    <div class="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-white/10 border border-white/10">
                      <span class="text-[10px] text-slate-300 block font-medium">पहचाना गया विकार (Anomaly)</span>
                      <span class="text-xs font-bold text-yellow-300 block truncate" [title]="diagnosisResult.dominantAnomaly || ''">
                        {{ diagnosisResult.dominantAnomaly || 'पत्ती का विकार' }}
                      </span>
                    </div>
                  </div>
                </div>
              }

              <!-- Symptoms Description -->
              <div class="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                <span class="font-extrabold flex items-center gap-1.5 text-amber-900">
                  <span>🔬</span> स्कैन में पहचाने गए लक्षण (Detected Symptoms):
                </span>
                <p class="font-medium leading-relaxed">{{ diagnosisResult.symptomsHindiDescription || diagnosisResult.symptomsDescription }}</p>
              </div>

              <!-- Chemical Remedy Box -->
              <div class="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-indigo-200 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-black text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🧪</span> रासायनिक उपचार (Chemical Treatment)
                  </span>
                  <span class="text-xs font-black px-2 py-0.5 bg-indigo-200 text-indigo-900 rounded-md">अनुशंसित</span>
                </div>
                <h4 class="text-base font-black text-slate-900">{{ diagnosisResult.chemicalSolution }}</h4>
                <div class="p-3 bg-white rounded-xl border border-indigo-100 text-xs font-bold text-indigo-950">
                  मात्रा (Dosage): {{ diagnosisResult.chemicalDosage }}
                </div>
              </div>

              <!-- Organic Remedy Box -->
              <div class="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 space-y-2">
                <span class="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🌿</span> जैविक एवं देसी उपचार (Organic & Biological Solution)
                </span>
                <p class="text-xs font-bold text-slate-800 leading-relaxed">
                  {{ diagnosisResult.organicSolution }}
                </p>
              </div>

              <!-- Prevention Checklist -->
              @if (diagnosisResult.preventionTips && diagnosisResult.preventionTips.length > 0) {
                <div class="space-y-2 pt-2">
                  <h4 class="text-xs font-black text-slate-900 uppercase tracking-wider">भविष्य में रोकथाम के उपाय:</h4>
                  <ul class="space-y-1.5">
                    @for (tip of diagnosisResult.preventionTips; track tip) {
                      <li class="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <span class="text-emerald-600 font-bold">✓</span>
                        <span>{{ tip }}</span>
                      </li>
                    }
                  </ul>
                </div>
              }

            </div>

          } @else {
            <!-- Clean Waiting State (Before Uploading Image) -->
            <div class="p-12 text-center rounded-3xl glass-card bg-white border border-slate-200 shadow-md space-y-4">
              <div class="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-100 to-green-100 flex items-center justify-center text-4xl shadow-inner">
                🍃📷
              </div>
              <h3 class="text-xl font-black text-slate-800">पत्ती की फोटो स्कैन करने हेतु तैयार</h3>
              <p class="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                बाईं ओर से रोगग्रस्त पत्ती की फोटो अपलोड करें और <strong>"एआई से रोग की जांच करें"</strong> बटन दबाएं। एआई पिक्सल और रंग स्पेक्ट्रम का वास्तविक समय में विश्लेषण करके सटीक परिणाम और उपचार प्रस्तुत करेगा।
              </p>
              <div class="pt-2 flex items-center justify-center gap-4 text-xs font-bold text-slate-400">
                <span>✓ वास्तविक इमेज विश्लेषण</span>
                <span>•</span>
                <span>✓ क्लोरोफिल स्पेक्ट्रम</span>
                <span>•</span>
                <span>✓ प्रमाणित उपचार</span>
              </div>
            </div>
          }
        </div>

      </div>

    </div>
  `
})
export class DiseaseDetectComponent {
  selectedCrop: string = 'Wheat (गेहूं)';
  symptomsText: string = '';
  imagePreview: string = '';
  loading: boolean = false;
  diagnosisResult: DiseaseDiagnosisResult | null = null;

  quickTags = [
    'पीली धारियां (Yellow Stripes)',
    'काले छल्लेदार धब्बे (Dark Rings)',
    'मुड़ी हुई पत्तियां (Curled Leaves)',
    'सफेद पाउडर (White Powder)',
    'पत्ती का सूखना (Drying Tips)',
    'सफेद मक्खी कीट (Whiteflies)'
  ];

  constructor(
    private cropService: CropService,
    private authService: AuthService,
    private audioGuide: AudioGuideService
  ) {
    // Starts completely clean - no static demo sample auto-loaded
  }

  appendTag(tag: string): void {
    if (this.symptomsText) {
      this.symptomsText += ', ' + tag;
    } else {
      this.symptomsText = tag;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  processFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
      this.diagnosisResult = null; // Clear previous result on new image
    };
    reader.readAsDataURL(file);
  }

  resetScan(): void {
    this.imagePreview = '';
    this.symptomsText = '';
    this.diagnosisResult = null;
  }

  runDiagnosis(): void {
    if (!this.imagePreview && !this.symptomsText) {
      alert('कृपया पहले पौधे या पत्ती की फोटो अपलोड करें या लक्षण दर्ज करें!');
      return;
    }

    this.loading = true;
    const phone = this.authService.currentUser()?.phoneNumber || '9876543210';

    this.cropService.diagnoseDisease({
      farmerPhone: phone,
      cropName: this.selectedCrop,
      observedSymptoms: this.symptomsText,
      imageBase64: this.imagePreview
    }).subscribe({
      next: (res) => {
        this.diagnosisResult = res;
        this.loading = false;
        try {
          this.audioGuide.speak(
            `रोग पहचान रिपोर्ट तैयार है: ${res.diseaseHindiName}। गंभीरता: ${res.severity}`,
            'hi-IN'
          );
        } catch (e) {
          // audio feedback optional
        }
      },
      error: (err) => {
        console.error('Diagnosis error:', err);
        alert('रोग की जांच करने में समस्या आई। कृपया पुनः प्रयास करें।');
        this.loading = false;
      }
    });
  }

  listenDiagnosis(): void {
    if (this.diagnosisResult?.audioSummaryHindi) {
      this.audioGuide.speak(this.diagnosisResult.audioSummaryHindi);
    }
  }
}
