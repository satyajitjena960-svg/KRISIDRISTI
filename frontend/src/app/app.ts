import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { I18nService, SupportedLanguage } from './services/i18n.service';
import { VoiceService } from './services/voice.service';
import {
  Diagnosis,
  FarmPlot,
  FollowUpRecord,
  CropHealthHistory,
  WeatherRiskAssessment,
  OutbreakRecord,
  NotificationAlert,
  AnalyticsDashboard
} from './models/crop.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  activeTab = signal<string>('diagnosis');
  userRole = signal<'FARMER' | 'EXPERT' | 'ADMIN'>('FARMER');

  // Input states
  selectedCrop = signal<string>('Tomato');
  selectedDistrict = signal<string>('Cuttack');
  villageInput = signal<string>('Barang');
  symptomNotes = signal<string>('Target-like dark brown circular spots with yellow halos on lower foliage');
  uploadedImage = signal<string>('assets/tomato-leaf.png');
  isAnalyzing = signal<boolean>(false);
  analysisProgress = signal<number>(0);

  // Core Data signals
  currentDiagnosis = signal<Diagnosis | null>(null);
  farmPlots = signal<FarmPlot[]>([]);
  healthTimeline = signal<CropHealthHistory[]>([]);
  weatherRisk = signal<WeatherRiskAssessment | null>(null);
  outbreaks = signal<OutbreakRecord[]>([]);
  notifications = signal<NotificationAlert[]>([]);
  analytics = signal<AnalyticsDashboard | null>(null);
  escalatedCases = signal<Diagnosis[]>([]);

  // Follow up state
  followUpTreatment = signal<string>('Sprayed Trichoderma viride (5g/L) and pruned diseased lower tiers');
  followUpObservation = signal<string>('Brown spots have dried completely; new upper shoots are green and uninfected');
  followUpResult = signal<FollowUpRecord | null>(null);

  // Expert portal state
  activeEscalated = signal<Diagnosis | null>(null);
  expertNotes = signal<string>('Confirmed Alternaria solani infestation. Recommend copper oxychloride 50 WP if wet weather persists.');
  expertPrescribedBio = signal<string>('Pseudomonas fluorescens foliar application @ 5g/L');
  expertPrescribedChem = signal<string>('Mancozeb 75 WP @ 2.5 g/L (max 2 rounds)');

  // Modal / Drawer toggles
  showNotifications = signal<boolean>(false);
  showAddPlotModal = signal<boolean>(false);

  // New Plot Form
  newPlot = {
    plotName: '',
    cropType: 'Tomato',
    variety: '',
    acreage: 1.0,
    plantingDate: new Date().toISOString().split('T')[0],
    location: 'Cuttack',
    soilType: 'Alluvial Loam',
    irrigationType: 'Drip Irrigation',
    previousDiseases: '',
    treatmentsApplied: ''
  };

  unreadCount = computed(() => {
    return this.notifications().filter(n => !n.isRead).length;
  });

  constructor(
    public api: ApiService,
    public i18n: I18nService,
    public voice: VoiceService
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    // Load Farm Plots
    this.api.getPlots(1).subscribe(plots => this.farmPlots.set(plots));

    // Load Health Timeline
    this.api.getHealthTimeline(2).subscribe(timeline => this.healthTimeline.set(timeline));

    // Load Weather Risk for selected crop & district
    this.fetchWeatherRisk();

    // Load Outbreaks
    this.api.getOutbreaks('Odisha').subscribe(records => this.outbreaks.set(records));

    // Load Notifications
    this.api.getNotifications(1).subscribe(alerts => this.notifications.set(alerts));

    // Load Analytics
    this.api.getAnalytics().subscribe(data => this.analytics.set(data));

    // Load Escalated Cases
    this.api.getEscalatedCases().subscribe(cases => {
      this.escalatedCases.set(cases);
      if (cases.length > 0 && !this.activeEscalated()) {
        this.activeEscalated.set(cases[0]);
      }
    });

    // Run default diagnosis for instant demo visualization
    this.runDiagnosis();
  }

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  setRole(role: 'FARMER' | 'EXPERT' | 'ADMIN') {
    this.userRole.set(role);
    if (role === 'EXPERT') {
      this.activeTab.set('expert');
    } else if (role === 'ADMIN') {
      this.activeTab.set('analytics');
    } else {
      this.activeTab.set('diagnosis');
    }
  }

  changeLanguage(lang: SupportedLanguage) {
    this.i18n.setLanguage(lang);
  }

  // Voice Interaction
  startVoiceInput() {
    this.voice.startListening(
      (spokenText) => {
        this.symptomNotes.set(spokenText);
      },
      (err) => {
        console.error('Speech error:', err);
      }
    );
  }

  readDiagnosisAloud() {
    const d = this.currentDiagnosis();
    if (!d) return;
    const textToSpeak = `Crop: ${d.cropType}. Diagnosis: ${d.diseaseName}. Confidence score: ${d.confidenceScore} percent. Severity is ${d.severityPercentage} percent. Safety notice: ${d.safetyDisclaimer}. Recommended organic action: ${d.biologicalControl.slice(0, 2).join('. ')}`;
    this.voice.speak(textToSpeak, this.i18n.currentLang());
  }

  // File Upload Handler
  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // Sample Image Picker for convenience
  selectSampleImage(sample: string) {
    if (sample === 'tomato') {
      this.selectedCrop.set('Tomato');
      this.symptomNotes.set('Concentric dark target rings with yellow halos on leaf margins');
    } else if (sample === 'rice') {
      this.selectedCrop.set('Rice');
      this.symptomNotes.set('Spindle shaped lesions with grayish centers on paddy leaves');
    } else if (sample === 'potato') {
      this.selectedCrop.set('Potato');
      this.symptomNotes.set('Water-soaked dark lesions and white downy mildew on leaf underside');
    } else if (sample === 'chili') {
      this.selectedCrop.set('Chili');
      this.symptomNotes.set('Severe upward leaf curling, puckering, and stunted growth');
    }
    this.runDiagnosis();
  }

  // Run AI Diagnosis
  runDiagnosis() {
    this.isAnalyzing.set(true);
    this.analysisProgress.set(15);

    const timer = setInterval(() => {
      this.analysisProgress.update(v => {
        if (v >= 90) {
          clearInterval(timer);
          return 90;
        }
        return v + 25;
      });
    }, 200);

    const payload = {
      farmerId: 1,
      farmPlotId: 2,
      cropType: this.selectedCrop(),
      district: this.selectedDistrict(),
      village: this.villageInput(),
      notes: this.symptomNotes(),
      imageBase64: this.uploadedImage()
    };

    setTimeout(() => {
      this.api.diagnoseCrop(payload).subscribe({
        next: (result) => {
          this.currentDiagnosis.set(result);
          this.analysisProgress.set(100);
          this.isAnalyzing.set(false);
          clearInterval(timer);
          // Refresh outbreaks & notifications
          this.api.getOutbreaks('Odisha').subscribe(records => this.outbreaks.set(records));
        },
        error: () => {
          this.isAnalyzing.set(false);
          clearInterval(timer);
        }
      });
    }, 900);
  }

  // Escalate to Expert
  escalateCurrentCase() {
    const diag = this.currentDiagnosis();
    if (!diag || !diag.id) return;

    this.api.escalateCase(diag.id, 'Farmer requested urgent agronomist review due to high spread rate.').subscribe(updated => {
      this.currentDiagnosis.set(updated);
      alert('Case successfully escalated to District Agricultural Extension Officer.');
      this.api.getEscalatedCases().subscribe(cases => this.escalatedCases.set(cases));
    });
  }

  // Fetch Weather Risk
  fetchWeatherRisk() {
    this.api.getWeatherRisk(this.selectedCrop(), this.selectedDistrict(), 'Odisha')
      .subscribe(res => this.weatherRisk.set(res));
  }

  onDistrictOrCropChange() {
    this.fetchWeatherRisk();
  }

  // Follow-Up Submission (Feature 6)
  submitFollowUp() {
    const diag = this.currentDiagnosis();
    if (!diag || !diag.id) return;

    const payload = {
      diagnosisId: diag.id,
      farmerId: 1,
      treatmentApplied: this.followUpTreatment(),
      farmerObservations: this.followUpObservation(),
      imageBase64: ''
    };

    this.api.submitFollowUp(payload).subscribe(res => {
      this.followUpResult.set(res);
      // Update diagnosis severity in UI
      if (this.currentDiagnosis()) {
        const d = { ...this.currentDiagnosis()! };
        d.severityPercentage = res.currentSeverity;
        d.status = res.conditionStatus === 'IMPROVING' ? 'IMPROVING' : 'ACTIVE';
        this.currentDiagnosis.set(d);
      }
    });
  }

  // Add Farm Plot (Feature 4)
  addNewPlot() {
    const plot: FarmPlot = {
      farmerId: 1,
      plotName: this.newPlot.plotName || 'New Plot',
      cropType: this.newPlot.cropType,
      variety: this.newPlot.variety || 'Local High Yield',
      acreage: this.newPlot.acreage,
      plantingDate: this.newPlot.plantingDate,
      location: `${this.selectedDistrict()}, Odisha`,
      soilType: this.newPlot.soilType,
      irrigationType: this.newPlot.irrigationType,
      previousDiseases: this.newPlot.previousDiseases,
      treatmentsApplied: this.newPlot.treatmentsApplied
    };

    this.api.addPlot(plot).subscribe(saved => {
      this.farmPlots.update(plots => [...plots, saved]);
      this.showAddPlotModal.set(false);
      alert(`Plot "${saved.plotName}" added to your farm profile!`);
    });
  }

  // Expert Review Submission
  submitAgronomistReview() {
    const active = this.activeEscalated();
    if (!active || !active.id) return;

    const review = {
      diagnosisId: active.id,
      verifiedDiseaseName: active.diseaseName,
      expertNotes: this.expertNotes(),
      prescribedBiologicalTreatment: this.expertPrescribedBio(),
      prescribedChemicalTreatment: this.expertPrescribedChem(),
      urgentActionRequired: 'Inspect adjacent 50-meter radius plots for early symptoms.'
    };

    this.api.submitExpertReview(active.id, review).subscribe(verified => {
      alert(`Official prescription submitted for ${verified.cropType} (${verified.diseaseName}). Farmer notified.`);
      this.api.getEscalatedCases().subscribe(cases => {
        this.escalatedCases.set(cases);
        this.activeEscalated.set(cases.length > 0 ? cases[0] : null);
      });
    });
  }

  markRead(notification: NotificationAlert) {
    if (notification.id) {
      this.api.markNotificationRead(notification.id).subscribe();
      notification.isRead = true;
    }
  }
}
