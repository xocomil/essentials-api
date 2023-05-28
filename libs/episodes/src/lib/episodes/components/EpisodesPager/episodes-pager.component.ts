import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { EpisodesStore } from '../../store/episodes.store';

@Component({
  selector: 'essentials-api-episodes-pager',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './episodes-pager.component.html',
  styleUrls: ['./episodes-pager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesPagerComponent {
  readonly #episodesStore = inject(EpisodesStore);

  protected readonly showNext = toSignal(this.#episodesStore.showNext$, {
    initialValue: false,
  });
  protected readonly showPrev = toSignal(this.#episodesStore.showPrev$, {
    initialValue: false,
  });

  protected getNext() {
    this.#episodesStore.getNextEpisodes();
  }

  protected getPrev() {
    this.#episodesStore.getPrevEpisodes();
  }
}
