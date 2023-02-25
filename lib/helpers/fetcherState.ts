import { FetcherResponse } from '../typings';

export function fetcherState<T = unknown>(
  data: T | null = null,
  error: string | null = null,
  loading = false,
) {
  const fetcherResponse: FetcherResponse<T> = {
    data,
    error,
    loading,
  };

  return {
    setData(data: T) {
      fetcherResponse.data = data;
    },

    setError(err: string | null) {
      fetcherResponse.error = err;
    },

    setLoading(loading: boolean) {
      fetcherResponse.loading = loading;
    },

    getState() {
      return fetcherResponse;
    },
  };
}
