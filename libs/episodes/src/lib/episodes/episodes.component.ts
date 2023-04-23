import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'essentials-api-episodes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesComponent {}
