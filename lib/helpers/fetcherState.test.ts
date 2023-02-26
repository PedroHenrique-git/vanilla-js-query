import { vi } from 'vitest';
import { fetcherState } from './fetcherState';

describe('fetcherState', () => {
  const { getState, setData, setError, setLoading } = fetcherState();

  const spyGetState = vi.fn(() => getState());
  const spySetData = vi.fn((data: unknown) => setData(data));
  const spySetError = vi.fn((error: string | null) => setError(error));
  const spySetLoading = vi.fn((loading: boolean) => setLoading(loading));

  beforeEach(() => {
    spyGetState.mockClear();
    spySetData.mockClear();
    spySetError.mockClear();
    spySetLoading.mockClear();
  });

  it('getState should be called once', () => {
    spyGetState();

    expect(spyGetState).toHaveBeenCalledTimes(1);
  });

  it('setData should be called once', () => {
    spySetData({});

    expect(spySetData).toHaveBeenCalledTimes(1);
  });

  it('setError should be called once', () => {
    spySetError(null);

    expect(spySetError).toHaveBeenCalledTimes(1);
  });

  it('setLoading should be called once', () => {
    spySetLoading(false);

    expect(spySetLoading).toHaveBeenCalledTimes(1);
  });

  it('should return the correct state', () => {
    spySetData({ user: 'test' });
    spySetError(null);
    spySetLoading(false);

    const { data, error, loading } = spyGetState();

    expect(data).toEqual({ user: 'test' });
    expect(error).toBeNull();
    expect(loading).toBe(false);
  });
});
