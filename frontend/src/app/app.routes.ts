import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WeatherComponent } from './components/weather/weather.component';
import { CropComponent } from './components/crop/crop.component';
import { RentalComponent } from './components/rental/rental.component';
import { DiseaseDetectComponent } from './components/disease-detect/disease-detect.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'crop', component: CropComponent },
  { path: 'rental', component: RentalComponent },
  { path: 'disease-detect', component: DiseaseDetectComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
