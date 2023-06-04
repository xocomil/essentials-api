import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  Input as RouteInput,
  inject,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { logObservable } from '@essentials-api/rxjs-operators';
import { EpisodeStore } from './store/episode.store';

@Component({
  selector: 'essentials-api-episode',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [EpisodeStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit {
  readonly #episodeStore = inject(EpisodeStore);

  readonly #id = signal('0');
  readonly #id$ = toObservable(this.#id).pipe(logObservable('id$'));

  readonly #destroyRef = inject(DestroyRef).onDestroy(() => {
    console.log('i was destroyed', this.#id());
  });

  @RouteInput() get id(): string {
    return this.#id();
  }

  set id(value: string | undefined) {
    this.#id.set(value ?? '');
  }

  ngOnInit(): void {
    this.#episodeStore.getEpisode(this.#id$);
  }
}
