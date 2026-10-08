import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fadeIn">
      <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm">
        <h3 class="text-xl font-bold text-gray-800 dark:text-slate-100 mb-2">{{ t('Image Analysis Studio') }}</h3>
        <p class="text-xs text-gray-500 dark:text-slate-400 mb-6">
          {{ t('Upload or drag and drop any image to run visual reasoning, object detection, or extract text.') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Dropzone / Image Preview -->
          <div class="space-y-4">
            <div (click)="fileInput.click()" class="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors bg-gray-50/50 dark:bg-slate-900/50 min-h-[260px]">
              <input #fileInput type="file" (change)="onFileSelected($event)" accept="image/*" class="hidden">
              
              <div *ngIf="!imagePreview" class="space-y-3">
                <div class="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl mx-auto">
                  <i class="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-700 dark:text-slate-200">{{ t('Click to upload image') }}</p>
                  <p class="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                </div>
              </div>

              <img *ngIf="imagePreview" [src]="imagePreview" class="max-h-60 rounded-2xl object-contain shadow-md">
            </div>

            <input type="text" [(ngModel)]="visionPrompt" [placeholder]="t('Prompt e.g., Explain what is in this image')" class="w-full bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-100 text-sm rounded-2xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-purple-500">
            
            <button (click)="analyze()" [disabled]="!imagePreview || isAnalyzing" class="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-md shadow-purple-500/20 flex items-center justify-center gap-2">
              <i class="fa-solid" [class.fa-spinner]="isAnalyzing" [class.fa-spin]="isAnalyzing" [class.fa-wand-magic-sparkles]="!isAnalyzing"></i>
              <span>{{ isAnalyzing ? t('Analyzing...') : t('Run Visual Analysis') }}</span>
            </button>
          </div>

          <!-- Analysis Output -->
          <div class="bg-gray-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col">
            <h4 class="text-sm font-bold text-gray-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <i class="fa-solid fa-square-poll-vertical text-purple-500"></i>
              <span>{{ t('Analysis Insights') }}</span>
            </h4>
            
            <div class="flex-1 overflow-y-auto text-sm text-gray-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
              {{ analysisResult || t('Upload an image and click analyze to see results.') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class VisionComponent {
  @Input() translationsCache: Record<string, string> = {};
  imagePreview: string | null = null;
  mimeType = 'image/jpeg';
  visionPrompt = '';
  analysisResult = '';
  isAnalyzing = false;

  constructor(private gemini: GeminiService) {}

  t(text: string): string {
    return this.translationsCache[text] || text;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.mimeType = file.type;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async analyze() {
    if (!this.imagePreview || this.isAnalyzing) return;
    this.isAnalyzing = true;
    this.analysisResult = await this.gemini.analyzeImage(this.imagePreview, this.mimeType, this.visionPrompt);
    this.isAnalyzing = false;
  }
}
