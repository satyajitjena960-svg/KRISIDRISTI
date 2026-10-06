import { Routes } from '@angular/router';
import { Expert } from './Component/expert/expert';

export const routes: Routes = [
  { path: '', redirectTo: 'expert', pathMatch: 'full' },
  { path: 'expert', component: Expert }
];