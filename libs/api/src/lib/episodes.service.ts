import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_TOKEN } from './api.di';
import { EpisodeResponse } from './models/episode';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  readonly #apiBase = inject(API_BASE_TOKEN);
  readonly #httpClient = inject(HttpClient);

  getAllEpisodes(): Observable<EpisodeResponse> {
    const endpoint = Location.joinWithSlash(this.#apiBase, 'episode');

    return this.#httpClient.get<EpisodeResponse>(endpoint);
  }
}
