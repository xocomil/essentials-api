import { createComponentFactory, mockProvider } from '@ngneat/spectator/jest';
import { EpisodesComponent } from './episodes.component';
import { EpisodesStore } from './store/episodes.store';

const episodesStoreStub = (): Partial<EpisodesStore> => ({
  getInitialEpisodes: jest.fn(),
});

const createComponent = createComponentFactory({
  component: EpisodesComponent,
  componentProviders: [mockProvider(EpisodesStore, episodesStoreStub())],
});

describe('EpisodesComponent', () => {
  it('should create', () => {
    const spectator = createComponent();

    expect(spectator).toBeTruthy();
  });
});
