import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'essentials-api-episode',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeComponent {
  @Input() id?: string;
}
