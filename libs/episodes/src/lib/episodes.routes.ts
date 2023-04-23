import { Routes } from '@angular/router';

export const episodeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./episodes/episodes.component').then((c) => c.EpisodesComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
