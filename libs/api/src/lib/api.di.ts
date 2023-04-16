import { InjectionToken, Provider } from '@angular/core';

const API_BASE_URL = 'https://rickandmortyapi.com/api' as const;

export const API_BASE_TOKEN = new InjectionToken<typeof API_BASE_URL>(
  'API_BASE_URL'
);

export const provideApiBase = (): Provider => ({
  provide: API_BASE_TOKEN,
  useValue: API_BASE_URL,
});
