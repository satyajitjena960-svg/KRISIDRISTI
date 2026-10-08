import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-voice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fadeIn">
      <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-6">
        <div>
          <h3 class="text-xl font-bold text-gray-800 dark:text-slate-100 mb-2">{{ t('Talk with Voice') }}</h3>
          <p class="text-xs text-gray-500 dark:text-slate-400">
            {{ t('Speech-to-speech interaction engine. Synthesize natural human voices and test speech inputs.') }}
          </p>
        </div>

        <!-- Waveform Visualizer simulation -->
        <div class="h-32 bg-slate-900 rounded-3xl flex items-center justify-center p-6 gap-1.5 overflow-hidden">
          <div *ngFor="let bar of visualizerBars" 
               [style.height.%]="isSpeaking ? bar.height : 20" 
               class="w-2 bg-gradient-to-t from-pink-500 to-purple-500 rounded-full transition-all duration-150">
          </div>
        </div>

        <div class="space-y-4">
          <textarea [(ngModel)]="speakText" rows="3" [placeholder]="t('Enter text to speak...')" class="w-full bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-100 text-sm rounded-2xl p-4 border-none outline-none focus:ring-2 focus:ring-pink-500"></textarea>

          <button (click)="speak()" [disabled]="!speakText.trim() || isSpeaking" class="w-full py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-md shadow-pink-500/20 flex items-center justify-center gap-2">
            <i class="fa-solid" [class.fa-volume-high]="!isSpeaking" [class.fa-spinner]="isSpeaking" [class.fa-spin]="isSpeaking"></i>
            <span>{{ isSpeaking ? t('Speaking...') : t('Synthesize & Speak') }}</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class VoiceComponent {
  @Input() translationsCache: Record<string, string> = {};
  speakText = 'Welcome to the AI Innovation Suite speech studio.';
  isSpeaking = false;
  visualizerBars = Array.from({ length: 30 }, () => ({ height: Math.floor(Math.random() * 80) + 20 }));

  t(text: string): string {
    return this.translationsCache[text] || text;
  }

  speak() {
    if (!this.speakText.trim() || this.isSpeaking) return;
    this.isSpeaking = true;
    
    // Web Speech Synthesis
    const utterance = new SpeechSynthesisUtterance(this.speakText);
    utterance.onend = () => {
      this.isSpeaking = false;
    };
    window.speechSynthesis.speak(utterance);

    // Animate bars
    const interval = setInterval(() => {
      if (!this.isSpeaking) {
        clearInterval(interval);
        return;
      }
      this.visualizerBars = this.visualizerBars.map(() => ({ height: Math.floor(Math.random() * 80) + 20 }));
    }, 150);
  }
}
