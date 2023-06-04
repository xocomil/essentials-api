import { TestBed } from '@angular/core/testing';
import { EpisodeStore } from './episode.store';

describe('EpisodeService', () => {
  let service: EpisodeStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpisodeStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
