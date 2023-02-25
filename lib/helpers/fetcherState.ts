export function queryState<T = unknown>(
  data: T | null = null,
  error: string | null = null,
  loading = false,
) {
  const queryResponse: QueryResponse<T> = {
    data,
    error,
    loading,
  };

  return {
    setData(data: T) {
      queryResponse.data = data;
    },

    setError(err: string | null) {
      queryResponse.error = err;
    },

    setLoading(loading: boolean) {
      queryResponse.loading = loading;
    },

    getState() {
      return queryResponse;
    },
  };
}
