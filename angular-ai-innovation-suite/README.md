# AI Innovation Suite (Angular Standalone Architecture)

A multi-modal AI Web Application built with Angular 17, Tailwind CSS, and Google Gemini 2.5 Flash models.

## Features
- **Authentication**: Stateful simulated Auth Service with Login & Register routing.
- **Dashboard**: Feature launchpads and full support for all 22 scheduled Indian regional state languages with instant UI translations.
- **AI Chat Assistant**: Integrated with Google Search Grounding for context-backed responses and voice dictation.
- **Image Upload & Analysis**: Multimodal visual reasoning and OCR extraction.
- **Talk with Voice**: Text-to-Speech studio with real-time audio waveform visualizers.
- **Voice Control**: Web Speech Recognition engine enabling direct hands-free navigation commands (e.g., *"go to dashboard"*, *"open chat"*, *"go to vision"*).

## Setup & Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Gemini API Key** (Optional for live real-time LLM requests):
   Set `API_KEY` in environment variables or window context.

3. **Start Development Server**:
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`.

4. **Build Production Application**:
   ```bash
   npm run build
   ```
