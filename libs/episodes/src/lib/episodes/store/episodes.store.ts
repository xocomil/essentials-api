import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EpisodeResponse, EpisodesService } from '@rick/api';
import { Observable, switchMap, tap } from 'rxjs';

type EpisodesState = {
  episodesResponse: EpisodeResponse;
};

const initialState = (): EpisodesState => ({
  episodesResponse: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  },
});

@Injectable()
export class EpisodesStore extends ComponentStore<EpisodesState> {
  readonly #episodeService = inject(EpisodesService);

  readonly episodes$ = this.select(
    ({ episodesResponse }) => episodesResponse.results
  );

  constructor() {
    super(initialState());
  }

  getInitialEpisodes = this.effect((getEpisodes$: Observable<void>) =>
    getEpisodes$.pipe(
      switchMap(() => this.#episodeService.getAllEpisodes()),
      tap((episodesResponse) => {
        this.patchState({
          episodesResponse,
        });
      })
    )
  );
}
