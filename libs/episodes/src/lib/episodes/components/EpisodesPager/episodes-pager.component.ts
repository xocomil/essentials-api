import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { EpisodesStore } from '../../store/episodes.store';

@Component({
  selector: 'essentials-api-episodes-pager',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './episodes-pager.component.html',
  styleUrls: ['./episodes-pager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesPagerComponent {
  readonly #episodesStore = inject(EpisodesStore);

  protected readonly numberOfEpisodes = this.#episodesStore.numberOfEpisodes;

  #getNext() {
    this.#episodesStore.getNextEpisodes();
  }

  #getPrev() {
    this.#episodesStore.getPrevEpisodes();
  }

  protected changePage(event: PageEvent) {
    if (event.pageIndex < (event.previousPageIndex ?? 0)) {
      this.#getPrev();

      return;
    }

    this.#getNext();
  }
}
