import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
  inject,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Episode, emptyEpisode } from '@rick/api';

@Component({
  selector: 'essentials-api-episode-tile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule],
  templateUrl: './episode-tile.component.html',
  styleUrls: ['./episode-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeTileComponent {
  readonly #router = inject(Router);
  readonly #ngZone = inject(NgZone);

  @Input() episode: Episode = emptyEpisode();

  protected cardClicked() {
    this.#ngZone.run(() => {
      this.#router.navigate(['/episodes', this.episode.id]);
    });
  }
}
