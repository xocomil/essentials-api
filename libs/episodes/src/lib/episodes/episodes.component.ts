import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { EpisodesStore } from './store/episodes.store';

@Component({
  selector: 'essentials-api-episodes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EpisodesStore],
})
export class EpisodesComponent implements OnInit {
  readonly #episodeStore = inject(EpisodesStore);

  protected episodes$ = this.#episodeStore.episodes$;

  ngOnInit(): void {
    this.#episodeStore.getInitialEpisodes();
  }
}
