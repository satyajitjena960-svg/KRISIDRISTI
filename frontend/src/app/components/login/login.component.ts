import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AudioGuideService } from '../../services/audio-guide.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LanguageSwitcherComponent],
  template: `
    <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      
      <!-- Glassmorphic Card Container -->
      <div class="w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-card relative overflow-hidden shadow-2xl border border-white/60">
        
        <!-- Top Right Language Switcher -->
        <div class="absolute top-4 right-4 z-20">
          <app-language-switcher></app-language-switcher>
        </div>

        <!-- Decorative Glow Blobs -->
        <div class="absolute -top-16 -right-16 w-36 h-36 bg-emerald-400/30 rounded-full blur-2xl pointer-events-none"></div>
        <div class="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

        <!-- Header -->
        <div class="text-center mb-5 pt-2">
          <div class="inline-flex p-3 bg-emerald-100/80 rounded-2xl text-3xl shadow-inner mb-2">
            🌾
          </div>
          <h1 class="text-2xl font-black text-slate-800">कृषि साथी किसान पोर्टल</h1>
          <p class="text-xs text-slate-500 mt-0.5">सुरक्षित डिजिटल प्रवेश द्वार • डेटाबेस से सीधे जुड़ा हुआ</p>
          
          <button
            type="button"
            (click)="speakInstructions()"
            class="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-full text-xs font-bold transition-all border border-emerald-200">
            <span>🔊</span> निर्देश सुनें (Audio Guide)
          </button>
        </div>

        <!-- Mode Toggle (OTP vs Password vs Register) -->
        <div class="flex p-1 bg-slate-100/90 rounded-2xl mb-5 text-xs font-black border border-slate-200">
          <button
            type="button"
            (click)="loginMode = 'otp'"
            [class.bg-white]="loginMode === 'otp'"
            [class.text-emerald-700]="loginMode === 'otp'"
            [class.shadow-md]="loginMode === 'otp'"
            class="flex-1 py-2 rounded-xl transition-all text-center">
            📱 OTP
          </button>
          <button
            type="button"
            (click)="loginMode = 'password'"
            [class.bg-white]="loginMode === 'password'"
            [class.text-emerald-700]="loginMode === 'password'"
            [class.shadow-md]="loginMode === 'password'"
            class="flex-1 py-2 rounded-xl transition-all text-center">
            🔑 पासवर्ड
          </button>
          <button
            type="button"
            (click)="loginMode = 'register'"
            [class.bg-white]="loginMode === 'register'"
            [class.text-emerald-700]="loginMode === 'register'"
            [class.shadow-md]="loginMode === 'register'"
            class="flex-1 py-2 rounded-xl transition-all text-center">
            📝 नया पंजीकरण
          </button>
        </div>

        @if (errorMessage) {
          <div class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
            ⚠️ {{ errorMessage }}
          </div>
        }

        @if (successMessage) {
          <div class="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl font-medium">
            ✅ {{ successMessage }}
          </div>
        }

        <!-- 1. OTP Form -->
        @if (loginMode === 'otp') {
          <form (ngSubmit)="handleOtpSubmit()" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">मोबाइल नंबर (Mobile Number)</label>
              <div class="relative">
                <span class="absolute left-3 top-3 text-slate-400 font-bold text-sm">+91</span>
                <input
                  type="tel"
                  [(ngModel)]="phoneNumber"
                  name="phoneNumber"
                  maxlength="10"
                  placeholder="9876543210"
                  required
                  class="w-full pl-12 pr-4 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-slate-800 text-base font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all" />
              </div>
            </div>

            @if (otpSent) {
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">प्राप्त ओटीपी दर्ज करें (Enter 6-digit OTP)</label>
                <input
                  type="text"
                  [(ngModel)]="otpCode"
                  name="otpCode"
                  maxlength="6"
                  placeholder="123456"
                  required
                  class="w-full px-4 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-center tracking-widest text-lg font-black text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                <p class="text-[11px] text-slate-500 mt-1">यूनिवर्सल टेस्टिंग ओटीपी: <span class="font-bold text-emerald-700">123456</span></p>
              </div>
            }

            <button
              type="submit"
              [disabled]="loading"
              class="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-green-600/30 transition-all active:scale-[0.98]">
              @if (loading) {
                <span>कृपया प्रतीक्षा करें...</span>
              } @else if (otpSent) {
                <span>सत्यापित करें एवं लॉगिन करें (Verify & Login)</span>
              } @else {
                <span>ओटीपी भेजें (Send OTP)</span>
              }
            </button>
          </form>
        }

        <!-- 2. Password Login Form -->
        @if (loginMode === 'password') {
          <form (ngSubmit)="handlePasswordSubmit()" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">मोबाइल नंबर</label>
              <input
                type="tel"
                [(ngModel)]="phoneNumber"
                name="phoneNumber"
                maxlength="10"
                placeholder="9876543210"
                required
                class="w-full px-4 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">पासवर्ड</label>
              <input
                type="password"
                [(ngModel)]="password"
                name="password"
                placeholder="••••••••"
                required
                class="w-full px-4 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>

            <button
              type="submit"
              [disabled]="loading"
              class="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-green-600/30 transition-all active:scale-[0.98]">
              {{ loading ? 'लॉगिन हो रहा है...' : 'लॉगिन करें (Sign In)' }}
            </button>
          </form>
        }

        <!-- 3. New Farmer Registration Form (Adds to DB directly) -->
        @if (loginMode === 'register') {
          <form (ngSubmit)="handleRegisterSubmit()" class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">किसान का पूरा नाम (Full Name)</label>
              <input
                type="text"
                [(ngModel)]="regFullName"
                name="regFullName"
                placeholder="उदा. रामेश्वर सिंह"
                required
                class="w-full px-4 py-2 bg-white/90 border border-slate-300 rounded-xl text-slate-800 font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">मोबाइल नंबर (10 अंक)</label>
                <input
                  type="tel"
                  [(ngModel)]="regPhone"
                  name="regPhone"
                  maxlength="10"
                  placeholder="9876543210"
                  required
                  class="w-full px-4 py-2 bg-white/90 border border-slate-300 rounded-xl text-slate-800 font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">पासवर्ड बनाएं</label>
                <input
                  type="password"
                  [(ngModel)]="regPassword"
                  name="regPassword"
                  placeholder="••••••••"
                  required
                  class="w-full px-4 py-2 bg-white/90 border border-slate-300 rounded-xl text-slate-800 font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">गाँव / शहर (Village)</label>
                <input
                  type="text"
                  [(ngModel)]="regVillage"
                  name="regVillage"
                  placeholder="उदा. पिपरिया"
                  class="w-full px-4 py-2 bg-white/90 border border-slate-300 rounded-xl text-slate-800 font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">खेत का रकबा (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  [(ngModel)]="regLandArea"
                  name="regLandArea"
                  placeholder="उदा. 4.5"
                  class="w-full px-4 py-2 bg-white/90 border border-slate-300 rounded-xl text-slate-800 font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">मुख्य फसलें (Primary Crops)</label>
              <input
                type="text"
                [(ngModel)]="regCrops"
                name="regCrops"
                placeholder="उदा. गेहूं, धान, सोयाबीन"
                class="w-full px-4 py-2 bg-white/90 border border-slate-300 rounded-xl text-slate-800 font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>

            <button
              type="submit"
              [disabled]="loading"
              class="w-full mt-2 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-green-600/30 transition-all active:scale-[0.98]">
              {{ loading ? 'पंजीकरण हो रहा है...' : 'नया किसान खाता बनाएं (Register in DB)' }}
            </button>
          </form>
        }

        <!-- One-Click Instant Demo Login for Testing -->
        <div class="mt-5 pt-4 border-t border-slate-200/80 text-center">
          <p class="text-xs text-slate-500 mb-2 font-medium">सीधे टेस्ट करने के लिए नीचे क्लिक करें:</p>
          <button
            type="button"
            (click)="authService.quickDemoLogin()"
            class="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
            <span>⚡</span> तुरंत डेमो किसान लॉगिन करें (1-Click Demo)
          </button>
        </div>

      </div>

    </div>
  `
})
export class LoginComponent {
  loginMode: 'otp' | 'password' | 'register' = 'otp';
  phoneNumber: string = '9876543210';
  password: string = 'password123';
  otpCode: string = '';
  otpSent: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  // Registration Fields
  regFullName: string = '';
  regPhone: string = '';
  regPassword: string = '';
  regVillage: string = '';
  regLandArea: number = 3.0;
  regCrops: string = 'Wheat, Paddy';

  constructor(
    public authService: AuthService,
    private audioGuide: AudioGuideService,
    private router: Router
  ) {}

  speakInstructions(): void {
    this.audioGuide.speak('कृषि साथी में आपका स्वागत है। अपना मोबाइल नंबर दर्ज करें और ओटीपी, पासवर्ड या नया पंजीकरण चुनकर आगे बढ़ें।');
  }

  handleOtpSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.otpSent) {
      if (!this.phoneNumber || this.phoneNumber.length < 10) {
        this.errorMessage = 'कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।';
        return;
      }
      this.loading = true;
      this.authService.sendOtp(this.phoneNumber).subscribe({
        next: (res) => {
          this.loading = false;
          this.otpSent = true;
          this.successMessage = res.message;
        },
        error: () => {
          this.loading = false;
          this.otpSent = true;
          this.successMessage = 'ओटीपी भेजा गया (सिमुलेटेड कोड: 123456)';
        }
      });
    } else {
      if (!this.otpCode) {
        this.errorMessage = 'कृपया ओटीपी दर्ज करें।';
        return;
      }
      this.loading = true;
      this.authService.verifyOtp(this.phoneNumber, this.otpCode).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.error || 'अमान्य ओटीपी कोड';
        }
      });
    }
  }

  handlePasswordSubmit(): void {
    this.errorMessage = '';
    this.loading = true;
    this.authService.login(this.phoneNumber, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'लॉगिन विफल। कृपया नंबर या पासवर्ड जांचें।';
      }
    });
  }

  handleRegisterSubmit(): void {
    this.errorMessage = '';
    if (!this.regFullName || !this.regPhone || !this.regPassword) {
      this.errorMessage = 'कृपया नाम, मोबाइल नंबर और पासवर्ड दर्ज करें।';
      return;
    }
    if (this.regPhone.length < 10) {
      this.errorMessage = 'मोबाइल नंबर 10 अंकों का होना चाहिए।';
      return;
    }

    this.loading = true;
    const req = {
      fullName: this.regFullName,
      phoneNumber: this.regPhone,
      password: this.regPassword,
      village: this.regVillage,
      district: 'Kisan District',
      landAreaAcres: this.regLandArea,
      primaryCrops: this.regCrops,
      role: 'ROLE_FARMER',
      preferredLanguage: 'hi'
    };

    this.authService.register(req).subscribe({
      next: (res) => {
        this.loading = false;
        alert('किसान खाता सफलतापूर्वक डेटाबेस में बन गया! (' + res.fullName + ')');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'पंजीकरण विफल। शायद यह नंबर पहले से दर्ज है।';
      }
    });
  }
}
