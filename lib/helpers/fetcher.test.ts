import { Db } from '../db/db';
import { fetcher } from './fetcher';
import { vi } from 'vitest';
import { posts } from '../mock';

describe('fetcher', () => {
  const cache = new Db();

  const getPosts = () => {
    return new Promise((resolve) => {
      resolve(posts);
    });
  };

  const postSpy = vi.fn(() => getPosts());

  beforeEach(() => {
    postSpy.mockClear();
  });

  it('should make a request', async () => {
    await fetcher('posts', postSpy, cache);

    expect(postSpy).toHaveBeenCalledTimes(1);
  });

  it('should not make a request', async () => {
    await fetcher('posts', postSpy, cache);

    expect(postSpy).toHaveBeenCalledTimes(0);
  });

  it('should return the correct response', async () => {
    const { data, error, loading } = await fetcher('posts', postSpy, cache);

    expect(data).toEqual(posts);
    expect(error).toBeNull();
    expect(loading).toBe(false);
  });
});
