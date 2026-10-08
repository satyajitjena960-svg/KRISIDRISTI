import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-[calc(100vh-120px)] flex flex-col bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <!-- Chat Header -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between bg-gray-50/50 dark:bg-slate-800/50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <i class="fa-solid fa-robot"></i>
          </div>
          <div>
            <h3 class="font-bold text-gray-800 dark:text-slate-100">{{ t('AI Chat Assistant') }}</h3>
            <span class="text-xs text-green-500 flex items-center gap-1 font-medium">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-ping"></span> Gemini 2.5 Flash Online
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <label class="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-slate-300 cursor-pointer bg-white dark:bg-slate-700 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-slate-600">
            <input type="checkbox" [(ngModel)]="useSearch" class="rounded text-indigo-600 focus:ring-indigo-500">
            <span>Google Search Grounding</span>
          </label>
        </div>
      </div>

      <!-- Messages Stream -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4">
        <div *ngFor="let msg of messages" [class]="msg.sender === 'user' ? 'justify-end' : 'justify-start'" class="flex gap-3">
          <div *ngIf="msg.sender === 'ai'" class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
            AI
          </div>
          <div [class]="msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none' : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-100 rounded-2xl rounded-tl-none'" class="max-w-2xl p-4 text-sm leading-relaxed shadow-sm space-y-2">
            <p class="whitespace-pre-wrap">{{ msg.text }}</p>
            
            <!-- Grounding Sources -->
            <div *ngIf="msg.sources && msg.sources.length > 0" class="pt-2 border-t border-gray-200/20 text-xs space-y-1">
              <span class="font-bold text-indigo-300">Sources:</span>
              <ul class="list-disc list-inside space-y-0.5">
                <li *ngFor="let src of msg.sources" class="truncate">
                  <a [href]="src.web?.uri" target="_blank" class="underline hover:text-indigo-200">{{ src.web?.title || src.web?.uri }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div *ngIf="isLoading" class="flex gap-3 items-center text-gray-400 text-sm">
          <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">AI</div>
          <div class="bg-gray-100 dark:bg-slate-700 px-4 py-3 rounded-2xl flex items-center gap-2">
            <i class="fa-solid fa-spinner animate-spin text-indigo-500"></i>
            <span>{{ t('Thinking...') }}</span>
          </div>
        </div>
      </div>

      <!-- Chat Input Controls -->
      <div class="p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <form (ngSubmit)="send()" class="flex items-center gap-2">
          <input type="text" [(ngModel)]="prompt" name="prompt" [placeholder]="t('Ask anything...')" class="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-100 text-sm rounded-2xl px-4 py-3 border-none outline-none focus:ring-2 focus:ring-indigo-500">
          <button type="submit" [disabled]="!prompt.trim() || isLoading" class="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium text-sm transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2">
            <span>{{ t('Send') }}</span>
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  `
})
export class ChatComponent {
  @Input() translationsCache: Record<string, string> = {};
  prompt = '';
  useSearch = true;
  isLoading = false;
  messages: Array<{ sender: 'user' | 'ai'; text: string; sources?: any[] }> = [
    { sender: 'ai', text: 'Hello! I am your AI assistant. How can I help you today?' }
  ];

  constructor(private gemini: GeminiService) {}

  t(text: string): string {
    return this.translationsCache[text] || text;
  }

  async send() {
    if (!this.prompt.trim() || this.isLoading) return;
    const userText = this.prompt;
    this.messages.push({ sender: 'user', text: userText });
    this.prompt = '';
    this.isLoading = true;

    const res = await this.gemini.askChat(userText, this.useSearch);
    this.messages.push({ sender: 'ai', text: res.text, sources: res.sources });
    this.isLoading = false;
  }
}
