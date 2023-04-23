import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory } from '@ngneat/spectator';
import { API_BASE_TOKEN } from './api.di';
import { EpisodesService } from './episodes.service';

describe('EpisodesService', () => {
  const createService = createServiceFactory({
    service: EpisodesService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: API_BASE_TOKEN, useValue: 'https://test.com' }],
  });

  it('should be created', () => {
    const spectator = createService();

    expect(spectator).toBeTruthy();
  });
});
