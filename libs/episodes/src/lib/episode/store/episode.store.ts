import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ComponentStore } from '@ngrx/component-store';
import { emptyEpisode, Episode, EpisodesService } from '@rick/api';
import { exhaustMap, Observable, switchMap, tap } from 'rxjs';

type EpisodeState = Episode;

const initialData = (): EpisodeState => emptyEpisode();

@Injectable()
export class EpisodeStore extends ComponentStore<EpisodeState> {
  readonly #episodesService = inject(EpisodesService);

  readonly name = this.selectSignal(({ name }) => name);
  readonly episode = this.selectSignal(({ episode }) => episode);
  readonly airDate = this.selectSignal(({ air_date }) => air_date);
  readonly #characterIds$ = this.select(({ characters: characterUrls }) =>
    parseCharacterIds(characterUrls)
  );
  readonly characters = toSignal(
    this.#characterIds$.pipe(
      exhaustMap((ids) => this.#episodesService.getCharacters(ids))
    ),
    { initialValue: [] }
  );

  constructor() {
    super(initialData());
  }

  readonly getEpisode = this.effect((id$: Observable<string>) =>
    id$.pipe(
      switchMap((id) => this.#episodesService.getEpisode(id)),
      tap((episode) => {
        this.patchState(episode);
      })
    )
  );
}

const filterNullOrUndefined = <T>(x: T | null | undefined): x is T => x != null;

const parseCharacterIds = (characterUrls: string[]): string[] =>
  characterUrls
    .map((url) => url.match(/character\/(\d+)/)?.[1])
    .filter(filterNullOrUndefined);
