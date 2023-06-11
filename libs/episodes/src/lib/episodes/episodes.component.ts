import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';
import { EpisodesPagerComponent } from './components/EpisodesPager/episodes-pager.component';
import { EpisodesStore } from './store/episodes.store';

@Component({
  selector: 'essentials-api-episodes',
  standalone: true,
  imports: [
    CommonModule,
    EpisodeListComponent,
    EpisodesPagerComponent,
    HeaderComponent,
  ],
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EpisodesStore],
})
export class EpisodesComponent {}
