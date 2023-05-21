import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PushPipe } from '@rx-angular/template/push';
import { EpisodesStore } from '../../store/episodes.store';
import { EpisodeTileComponent } from '../episode-tile/episode-tile.component';

@Component({
  selector: 'essentials-api-episode-list',
  standalone: true,
  imports: [CommonModule, EpisodeTileComponent, MatButtonModule, PushPipe],
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeListComponent implements OnInit {
  readonly #episodeStore = inject(EpisodesStore);

  protected episodes$ = this.#episodeStore.episodes$;

  ngOnInit(): void {
    this.#episodeStore.getInitialEpisodes();
  }
}
