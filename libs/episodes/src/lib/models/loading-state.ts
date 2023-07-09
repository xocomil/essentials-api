type ApiSuccess = {
  state: 'success';
};

type ApiError = {
  state: 'error';
  message: string;
};

type ApiLoading = {
  state: 'loading';
};

type ApiPending = {
  state: 'pending';
};

export type LoadingState = ApiSuccess | ApiError | ApiLoading | ApiPending;

export const createApiSuccess = (): ApiSuccess => ({ state: 'success' });
export const createApiLoading = (): ApiLoading => ({ state: 'loading' });
export const createApiPending = (): ApiPending => ({ state: 'pending' });

export const createApiError = (message: string): ApiError => ({
  state: 'error',
  message,
});
