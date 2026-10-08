import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  public onCommand = new EventEmitter<string>();
  public onDictation = new EventEmitter<string>();
  public isListening = false;
  private recognition: any = null;

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        const lastIndex = event.results.length - 1;
        const transcript = event.results[lastIndex][0].transcript.trim().toLowerCase();
        
        if (transcript.includes('dashboard') || transcript.includes('go to dashboard')) {
          this.onCommand.emit('dashboard');
        } else if (transcript.includes('chat') || transcript.includes('open chat') || transcript.includes('go to chat')) {
          this.onCommand.emit('chat');
        } else if (transcript.includes('vision') || transcript.includes('image') || transcript.includes('go to vision')) {
          this.onCommand.emit('vision');
        } else if (transcript.includes('voice') || transcript.includes('go to voice') || transcript.includes('talk')) {
          this.onCommand.emit('voice');
        } else if (transcript.includes('select image') || transcript.includes('upload image')) {
          this.onCommand.emit('trigger-image-select');
        } else {
          this.onDictation.emit(transcript);
        }
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          try { this.recognition.start(); } catch {}
        }
      };
    }
  }

  toggleListening(): boolean {
    if (!this.recognition) return false;
    this.isListening = !this.isListening;
    if (this.isListening) {
      try { this.recognition.start(); } catch {}
    } else {
      try { this.recognition.stop(); } catch {}
    }
    return this.isListening;
  }
}
