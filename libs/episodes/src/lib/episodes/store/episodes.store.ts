import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EpisodeResponse, EpisodesService } from '@rick/api';
import {
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  createApiLoading,
  createApiPending,
  createApiSuccess,
  LoadingState,
} from '../../models/loading-state';

type EpisodesState = {
  episodesResponse: EpisodeResponse;
  loadingState: LoadingState;
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
  loadingState: createApiPending(),
});

@Injectable()
export class EpisodesStore extends ComponentStore<EpisodesState> {
  readonly #episodeService = inject(EpisodesService);

  readonly episodes$ = this.select(
    ({ episodesResponse }) => episodesResponse.results,
  );

  readonly #episodeInfo$ = this.select(
    ({ episodesResponse: { info } }) => info,
  );
  readonly showNext$ = this.#episodeInfo$.pipe(map(({ next }) => !!next));
  readonly showPrev$ = this.#episodeInfo$.pipe(map(({ prev }) => !!prev));
  readonly loading = this.selectSignal(
    ({ loadingState }) => loadingState.state === 'loading',
  );

  readonly numberOfEpisodes = this.selectSignal(
    ({
      episodesResponse: {
        info: { count },
      },
    }) => count,
  );

  constructor() {
    super(initialState());
  }

  readonly getInitialEpisodes = this.effect((getEpisodes$: Observable<void>) =>
    getEpisodes$.pipe(
      tap(() => this.patchState({ loadingState: createApiLoading() })),
      switchMap(() => this.#episodeService.getAllEpisodes()),
      tap((episodesResponse) => {
        this.patchState({
          episodesResponse,
          loadingState: createApiSuccess(),
        });
      }),
    ),
  );

  readonly getNextEpisodes = this.effect((getEpisodes$: Observable<void>) =>
    getEpisodes$.pipe(
      withLatestFrom(this.#episodeInfo$),
      tap(([, episodeInfo]) => {
        this.#getEpisodes(episodeInfo.next);
      }),
    ),
  );

  readonly #getEpisodes = this.effect((endpoint$: Observable<string | null>) =>
    endpoint$.pipe(
      tap(() => this.patchState({ loadingState: createApiLoading() })),
      switchMap((endpoint) => {
        if (!endpoint) {
          return of(undefined);
        }

        return this.#episodeService.getEpisodes(endpoint);
      }),
      filter(Boolean),
      tap((episodesResponse) => {
        this.patchState({
          episodesResponse,
          loadingState: createApiSuccess(),
        });
      }),
    ),
  );

  readonly getPrevEpisodes = this.effect((getEpisodes$: Observable<void>) =>
    getEpisodes$.pipe(
      withLatestFrom(this.#episodeInfo$),
      tap(([, episodeInfo]) => {
        this.#getEpisodes(episodeInfo.prev);
      }),
    ),
  );
}
