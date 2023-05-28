import { Routes } from '@angular/router';

export const episodeRoutes: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./episode/episode.component').then((c) => c.EpisodeComponent),
  },
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
