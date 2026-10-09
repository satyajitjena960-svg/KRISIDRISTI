# 🌾 KrishiSathi (कृषि साथी) — Zero-Editing Local-First Agricultural Web Application

**KrishiSathi** is an agricultural microservices platform with a high-usability, low-literacy Angular 18 frontend, Spring Boot 3 microservices backend, and local PostgreSQL database support.

---

## 🏗️ Architecture & Component Topology

```
                  ┌──────────────────────────────────────────────┐
                  │   Angular 18 Standalone PWA (Port 4200)       │
                  │  (Web Speech API, Tailwind, Signals, TTS)   │
                  └──────────────────────┬───────────────────────┘
                                         │ HTTP REST
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │    Spring Cloud API Gateway (Port 8080)      │
                  └──────┬────────┬────────┬────────┬────────┬───┘
                         │        │        │        │        │
       ┌─────────────────┘        │        │        │        └────────────────┐
       ▼                          ▼        ▼        ▼                         ▼
┌───────────────┐  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐  ┌──────────────┐
│  Auth Service │  │ User Service│ │ Crop Service │ │Rental Service│  │Weather Service
│   (Port 8081) │  │ (Port 8082) │ │ (Port 8083)  │ │ (Port 8084)  │  │ (Port 8085)  │
└───────┬───────┘  └──────┬──────┘ └──────┬───────┘ └──────┬───────┘  └──────┬───────┘
        ▼                 ▼               ▼                ▼                 ▼
 ┌─────────────┐   ┌─────────────┐ ┌─────────────┐  ┌─────────────┐   ┌─────────────┐
 │   auth_db   │   │   user_db   │ │   crop_db   │  │  rental_db  │   │  weather_db │
 └─────────────┘   └─────────────┘ └─────────────┘  └─────────────┘   └─────────────┘
                                  Local PostgreSQL (Port 5432)
```

---

## ⚡ Zero-Editing Quick Start Guide

### Step 1: Create the Local PostgreSQL Databases
Run the provided SQL script using `psql` or pgAdmin (using your password `Cutm@059`):
```bash
psql -U postgres -p 5432 -f setup.sql
```
*Creates all 5 independent databases: `auth_db`, `user_db`, `crop_db`, `rental_db`, and `weather_db`.*

### Step 2: Launch All Microservices & Frontend (1-Click)
You can launch everything using the provided PowerShell or Batch scripts:

**Option A (PowerShell):**
```powershell
.\start-all.ps1
```

**Option B (Windows Batch double-click):**
```cmd
start-all.bat
```

**Option C (Manual terminal by terminal):**
```bash
# Terminal 1: API Gateway
cd api-gateway && mvn spring-boot:run

# Terminal 2: Auth Service
cd auth-service && mvn spring-boot:run

# Terminal 3: User Service
cd user-service && mvn spring-boot:run

# Terminal 4: Crop Service
cd crop-service && mvn spring-boot:run

# Terminal 5: Rental Service
cd rental-service && mvn spring-boot:run

# Terminal 6: Weather Service
cd weather-service && mvn spring-boot:run

# Terminal 7: Angular Frontend
cd frontend && npm start
```

---

## 🌐 Accessing the Application

Open your browser at:
👉 **[http://localhost:4200](http://localhost:4200)**

### ⚡ Quick Demo Farmer Login (1-Click)
- On the login screen, click **"⚡ तुरंत डेमो किसान लॉगिन करें (1-Click Demo)"**
- Or use phone: `9876543210` and password: `password123`
- Or use OTP mode: Enter any 10-digit number and use test OTP: `123456`

---

## 🎙️ Voice-Driven Navigation (Web Speech API)
Click the **floating green/red microphone** button at the bottom-right corner of any screen or say:
- **"बीमारी" / "रोग" / "Disease" / "Doctor"** ➔ Opens AI Crop Disease Doctor & Leaf Scanner.
- **"मौसम" / "Weather"** ➔ Opens hyper-local weather advisory.
- **"फसल" / "Crop"** ➔ Opens crop schedule and fertilizer calculation.
- **"ट्रैक्टर" / "Rental" / "किराया"** ➔ Opens machinery rental marketplace.
- **"डैशबोर्ड" / "Home"** ➔ Returns to the main dashboard.
- **"लॉगआउट" / "Logout"** ➔ Logs out.

---

## 🩺 AI Crop Disease Doctor & Solution Engine
- **Photo Upload & Live Symptoms**: Upload leaf pictures or pick observed disease symptoms (yellow stripes, black circular rings, curled cupped leaves, stem borer, blights).
- **Instant 1-Click Test Samples**: Wheat Yellow Rust, Tomato Early Blight, Rice Blast, and Tomato Leaf Curl Virus.
- **Comprehensive Dual Treatment Engine**:
  - **Chemical Remedies**: Exact chemical formulations, brand names (e.g. Tilt 25 EC, Ridomil MZ, Beam 75 WP, Confidor), and dosage per acre / liter.
  - **Organic & Biological Remedies**: Neem oil (1500–3000 ppm), Trichoderma viride, cow urine / buttermilk solutions, and sticky traps.
  - **Prevention Tips**: Crop rotation, resistant hybrid seed recommendations, and moisture management.
  - **Audio Guidance**: "दवा व उपचार सुनें" button plays Hindi voice instructions through Web Speech Synthesis.

---

## 🔑 Port Map & Pre-configured Endpoints

| Service | Port | Database | Key Endpoints |
|---|---|---|---|
| **API Gateway** | `8080` | - | `http://localhost:8080/api/**` (CORS enabled for :4200) |
| **Auth Service** | `8081` | `auth_db` | `/api/auth/register`, `/api/auth/login`, `/api/auth/send-otp`, `/api/auth/verify-otp` |
| **User Service** | `8082` | `user_db` | `/api/users/profile/{phone}`, `/api/users/profile/{phone}/location` |
| **Crop Service** | `8083` | `crop_db` | `/api/crops`, `/api/crops/disease/diagnose`, `/api/crops/disease/history/{phone}`, `/api/crops/{id}/guidance` |
| **Rental Service** | `8084` | `rental_db` | `/api/rentals/listings`, `/api/rentals/bookings`, `/api/rentals/bookings/renter/{phone}` |
| **Weather Service**| `8085` | `weather_db`| `/api/weather/current?lat=...&lon=...`, `/api/weather/advisory` |
| **Frontend** | `4200` | - | Angular 18 Standalone PWA (`/disease-detect`, `/crop`, `/weather`, `/rental`, `/dashboard`) |

---

## 🛠️ Verification & Build Status
All microservices were verified and compiled with **Maven 3.9.16** and **Java 21/25**:
- `api-gateway`: **SUCCESS**
- `auth-service`: **SUCCESS**
- `user-service`: **SUCCESS**
- `crop-service`: **SUCCESS**
- `rental-service`: **SUCCESS**
- `weather-service`: **SUCCESS**
