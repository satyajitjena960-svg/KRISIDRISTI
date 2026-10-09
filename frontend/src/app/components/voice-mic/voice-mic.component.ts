import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceNavService } from '../../services/voice-nav.service';

@Component({
  selector: 'app-voice-mic',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <!-- Status Feedback Bubble -->
      @if (voiceNav.isListening() || voiceNav.lastTranscript() || voiceNav.lastActionMessage()) {
        <div class="mb-3 max-w-xs sm:max-w-sm rounded-2xl bg-slate-900/90 text-white p-3.5 shadow-2xl backdrop-blur-md border border-slate-700 animate-bounce text-sm">
          @if (voiceNav.isListening()) {
            <div class="flex items-center gap-2 text-amber-400 font-semibold mb-1">
              <span class="inline-block w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
              सुन रहे हैं... (Listening now)
            </div>
            <p class="text-xs text-slate-300">बोलें: "मौसम", "फसल", "ट्रैक्टर", "डैशबोर्ड"...</p>
          }

          @if (voiceNav.lastTranscript()) {
            <p class="text-xs text-slate-200 mt-1">आपने कहा: <span class="font-bold text-green-300">"{{ voiceNav.lastTranscript() }}"</span></p>
          }

          @if (voiceNav.lastActionMessage()) {
            <p class="text-xs text-emerald-400 font-medium mt-1">{{ voiceNav.lastActionMessage() }}</p>
          }
        </div>
      }

      <!-- Floating Mic Button with Pulsing Animation -->
      <button
        (click)="voiceNav.toggleListening()"
        [class.listening-ring]="voiceNav.isListening()"
        [class.bg-red-600]="voiceNav.isListening()"
        [class.bg-emerald-600]="!voiceNav.isListening()"
        class="group relative flex items-center justify-center w-16 h-16 rounded-full text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
        title="आवाज से चलाएं (Voice Navigation)">
        
        @if (voiceNav.isListening()) {
          <!-- Listening Icon -->
          <svg class="w-8 h-8 animate-pulse text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        } @else {
          <!-- Idle Mic Icon -->
          <svg class="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        }

        <!-- Accessibility tooltip label -->
        <span class="absolute -top-1 -right-1 flex h-4 w-4">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
        </span>
      </button>

      <!-- Label below button for low-literacy farmers -->
      <span class="mt-1 text-[11px] font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded-full shadow border border-slate-200">
        {{ voiceNav.isListening() ? 'सुन रहे हैं' : 'बोलकर खोजें' }}
      </span>
    </div>
  `
})
export class VoiceMicComponent {
  constructor(public voiceNav: VoiceNavService) {}
}
