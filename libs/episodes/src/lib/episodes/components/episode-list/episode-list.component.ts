import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EpisodesStore } from '../../store/episodes.store';
import { EpisodeTileComponent } from '../episode-tile/episode-tile.component';

@Component({
  selector: 'essentials-api-episode-list',
  standalone: true,
  imports: [
    CommonModule,
    EpisodeTileComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeListComponent implements OnInit {
  readonly #episodeStore = inject(EpisodesStore);
  readonly loading = this.#episodeStore.loading;

  protected episodes = toSignal(this.#episodeStore.episodes$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.#episodeStore.getInitialEpisodes();
  }
}
