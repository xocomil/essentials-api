import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { logObservable } from '@essentials-api/rxjs-operators';
import { ComponentStore } from '@ngrx/component-store';
import { emptyEpisode, Episode, EpisodesService } from '@rick/api';
import { exhaustMap, Observable, switchMap, tap } from 'rxjs';
import {
  createApiLoading,
  createApiPending,
  createApiSuccess,
  LoadingState,
} from '../../models/loading-state';

type EpisodeState = {
  episode: Episode;
  loadingState: LoadingState;
  charactersLoading: LoadingState;
};

const initialData = (): EpisodeState => ({
  episode: emptyEpisode(),
  loadingState: createApiPending(),
  charactersLoading: createApiPending(),
});

@Injectable()
export class EpisodeStore extends ComponentStore<EpisodeState> {
  readonly #episodesService = inject(EpisodesService);

  readonly name = this.selectSignal(({ episode }) => episode.name);
  readonly episode = this.selectSignal(({ episode }) => episode.episode);
  readonly airDate = this.selectSignal(({ episode }) => episode.air_date);
  readonly loading = this.selectSignal(
    ({ loadingState }) => loadingState.state === 'loading',
  );
  readonly charactersLoading = this.selectSignal(
    ({ charactersLoading }) => charactersLoading.state === 'loading',
  );

  readonly #currentEpisode$ = this.select(({ episode }) => episode).pipe(
    logObservable('episode$'),
  );
  readonly #characterIds$ = this.select(
    this.#currentEpisode$,
    ({ characters }) => parseCharacterIds(characters),
  ).pipe(logObservable('characterId$'));
  readonly characters = toSignal(
    this.#characterIds$.pipe(
      tap(() => this.patchState({ charactersLoading: createApiLoading() })),
      exhaustMap((ids) => this.#episodesService.getCharacters(ids)),
      tap(() => this.patchState({ charactersLoading: createApiSuccess() })),
    ),
    { initialValue: [] },
  );

  constructor() {
    super(initialData());
  }

  readonly getEpisode = this.effect((id$: Observable<string>) =>
    id$.pipe(
      tap(() => this.patchState({ loadingState: createApiLoading() })),
      switchMap((id) => this.#episodesService.getEpisode(id)),
      tap((episode) => {
        this.patchState({ episode, loadingState: createApiSuccess() });
      }),
    ),
  );
}

const filterNullOrUndefined = <T>(x: T | null | undefined): x is T => x != null;

const parseCharacterIds = (characterUrls: string[]): string[] =>
  characterUrls
    .map((url) => url.match(/character\/(\d+)/)?.[1])
    .filter(filterNullOrUndefined);
