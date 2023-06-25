import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_BASE_TOKEN } from './api.di';
import { Character } from './models/character';
import { Episode, EpisodeResponse } from './models/episode';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  readonly #apiBase = inject(API_BASE_TOKEN);
  readonly #httpClient = inject(HttpClient);

  getAllEpisodes(): Observable<EpisodeResponse> {
    const endpoint = Location.joinWithSlash(this.#apiBase, 'episode');

    return this.getEpisodes(endpoint);
  }

  getEpisodes(endpoint: string): Observable<EpisodeResponse> {
    return this.#httpClient.get<EpisodeResponse>(endpoint);
  }

  getEpisode(id: string): Observable<Episode> {
    return this.#httpClient.get<Episode>(
      Location.joinWithSlash(this.#apiBase, `episode/${id}`)
    );
  }

  getCharacters(ids: string[]): Observable<Character[]> {
    if (ids.length === 0) {
      return of([]);
    }

    return this.#httpClient.get<Character[]>(
      Location.joinWithSlash(this.#apiBase, `character/[${ids.join(',')}]`)
    );
  }
}
