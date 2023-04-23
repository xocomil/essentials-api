import { createComponentFactory } from '@ngneat/spectator';
import { EpisodesService } from '@rick/api';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    component: AppComponent,
    mocks: [EpisodesService],
  });

  it('should create', () => {
    const spectator = createComponent();

    expect(spectator).toBeTruthy();
  });
});
