import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { emptyEpisode, Episode } from '@rick/api';

@Component({
  selector: 'essentials-api-episode-tile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule],
  templateUrl: './episode-tile.component.html',
  styleUrls: ['./episode-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeTileComponent {
  @Input() episode: Episode = emptyEpisode();
}
