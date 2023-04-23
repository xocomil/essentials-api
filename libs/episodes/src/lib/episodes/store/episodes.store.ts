import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Episode, EpisodesService } from '@rick/api';
import { Observable, switchMap, tap } from 'rxjs';

type EpisodesState = {
  episodes: Episode[];
};

const initialState = (): EpisodesState => ({
  episodes: [],
});

@Injectable()
export class EpisodesStore extends ComponentStore<EpisodesState> {
  readonly #episodeService = inject(EpisodesService);

  readonly episodes$ = this.select(({ episodes }) => episodes);

  constructor() {
    super(initialState());
  }

  getInitialEpisodes = this.effect((getEpisodes$: Observable<void>) =>
    getEpisodes$.pipe(
      switchMap(() => this.#episodeService.getAllEpisodes()),
      tap((episodes) => {
        this.patchState({
          episodes,
        });
      })
    )
  );
}
