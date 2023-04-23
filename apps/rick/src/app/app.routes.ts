import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'episodes',
    loadChildren: () => import('@rick/episodes').then((m) => m.episodeRoutes),
  },
  {
    path: '**',
    redirectTo: 'episodes',
  },
];
