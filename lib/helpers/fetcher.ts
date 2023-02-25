import { queryState } from './fetcherState';

export async function fetcher<T = unknown>(
  key: string,
  fetcher: () => Promise<T>,
  cache: Db,
) {
  const { setLoading, setData, setError, getState } = queryState<T>();

  try {
    setLoading(true);

    if (cache.has(key) && (await cache.isValid(key))) {
      const cachedData = await cache.get(key);

      setData(cachedData?.data as T);
    } else {
      const data = await fetcher();
      cache.add(key, data, cache.cacheTime);

      setData(data);
    }
  } catch (err) {
    const castedErr = err as { message: string };

    setError(castedErr.message);
  } finally {
    setLoading(false);
  }

  return getState();
}
