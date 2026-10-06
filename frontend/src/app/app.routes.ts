import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'expert',
    loadComponent: () =>
      import('./Component/expert/expert').then((m) => m.Expert)
  },
  {
    path: '',
    redirectTo: 'expert',
    pathMatch: 'full'
  }
];