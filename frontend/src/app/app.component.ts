import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VoiceMicComponent } from './components/voice-mic/voice-mic.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, VoiceMicComponent],
  template: `
    <div class="min-h-screen flex flex-col font-sans">
      <app-navbar></app-navbar>

      <main class="flex-1 pb-24">
        <router-outlet></router-outlet>
      </main>

      <!-- Global Floating Microphone Available on Every Screen -->
      <app-voice-mic></app-voice-mic>
    </div>
  `
})
export class AppComponent {
  title = 'KrishiSathi';
}
