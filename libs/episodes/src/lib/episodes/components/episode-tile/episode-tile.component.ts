import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { emptyEpisode, Episode } from '@rick/api';

@Component({
  selector: 'essentials-api-episode-tile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './episode-tile.component.html',
  styleUrls: ['./episode-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeTileComponent {
  @Input() episode: Episode = emptyEpisode();
}
