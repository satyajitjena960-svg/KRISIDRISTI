import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AudioGuideService } from './audio-guide.service';

@Injectable({
  providedIn: 'root'
})
export class VoiceNavService {
  isListening = signal<boolean>(false);
  lastTranscript = signal<string>('');
  lastActionMessage = signal<string>('');

  private recognition: any = null;

  constructor(private router: Router, private audioGuide: AudioGuideService) {
    this.initSpeechRecognition();
  }

  private initSpeechRecognition(): void {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'hi-IN'; // Default to Hindi, also recognizes English phonemes

        this.recognition.onstart = () => {
          this.isListening.set(true);
        };

        this.recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.trim().toLowerCase();
          this.lastTranscript.set(transcript);
          this.handleVoiceCommand(transcript);
        };

        this.recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          this.isListening.set(false);
        };

        this.recognition.onend = () => {
          this.isListening.set(false);
        };
      }
    }
  }

  toggleListening(): void {
    if (!this.recognition) {
      alert('Voice recognition is not supported in this browser. Please use Chrome, Edge, or Android Chrome.');
      return;
    }

    if (this.isListening()) {
      this.recognition.stop();
      this.isListening.set(false);
    } else {
      try {
        this.recognition.start();
      } catch (err) {
        this.recognition.stop();
      }
    }
  }

  private handleVoiceCommand(raw: string): void {
    const text = raw.toLowerCase();

    if (text.includes('weather') || text.includes('mausam') || text.includes('मौसम') || text.includes('barish') || text.includes('बारिश')) {
      this.lastActionMessage.set('मौसम विभाग खोला जा रहा है (Opening Weather)');
      this.audioGuide.speak('मौसम स्क्रीन खोली जा रही है');
      this.router.navigate(['/weather']);
    } else if (text.includes('disease') || text.includes('bimari') || text.includes('बीमारी') || text.includes('rog') || text.includes('रोग') || text.includes('doctor') || text.includes('डॉक्टर') || text.includes('dawa') || text.includes('दवा')) {
      this.lastActionMessage.set('फसल रोग डॉक्टर खोला जा रहा है (Opening AI Crop Doctor)');
      this.audioGuide.speak('फसल रोग पहचान और डॉक्टर स्क्रीन खोली जा रही है');
      this.router.navigate(['/disease-detect']);
    } else if (text.includes('crop') || text.includes('crops') || text.includes('fasal') || text.includes('फसल') || text.includes('kheti')) {
      this.lastActionMessage.set('फसल मार्गदर्शन खोला जा रहा है (Opening Crop Guidance)');
      this.audioGuide.speak('आपकी फसलों का विवरण खोला जा रहा है');
      this.router.navigate(['/crop']);
    } else if (text.includes('rent') || text.includes('rental') || text.includes('kiraya') || text.includes('किराया') || text.includes('tractor') || text.includes('ट्रैक्टर') || text.includes('machine')) {
      this.lastActionMessage.set('कृषि यंत्र किराया बाजार खोला जा रहा है (Opening Equipment Rental)');
      this.audioGuide.speak('कृषि उपकरण किराया बाजार खोला जा रहा है');
      this.router.navigate(['/rental']);
    } else if (text.includes('home') || text.includes('dashboard') || text.includes('ghar') || text.includes('डैशबोर्ड') || text.includes('मुख्य')) {
      this.lastActionMessage.set('डैशबोर्ड पर जाया जा रहा है (Opening Dashboard)');
      this.audioGuide.speak('मुख्य डैशबोर्ड पर वापस आ गए हैं');
      this.router.navigate(['/dashboard']);
    } else if (text.includes('logout') || text.includes('बाहर') || text.includes('exit')) {
      this.lastActionMessage.set('लॉगआउट किया जा रहा है');
      this.audioGuide.speak('लॉगआउट किया जा रहा है');
      this.router.navigate(['/login']);
    } else {
      this.lastActionMessage.set(`आदेश समझ नहीं आया: "${raw}"`);
      this.audioGuide.speak('कृपया फिर से बोलें: जैसे मौसम, फसल, या ट्रैक्टर');
    }
  }
}
