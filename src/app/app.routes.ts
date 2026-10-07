import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'expert',
    pathMatch: 'full'
  },
  {
    path: 'expert',
    loadComponent: () =>
      import('./Component/expert/expert').then((m) => m.Expert)
  }
];