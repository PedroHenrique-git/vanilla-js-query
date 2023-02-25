import { fiveMinutes } from '../constants';
import { DbData, Store } from '../typings';

export const postOne: DbData = {
  data: { id: 1, post: 'mock post' },
  timestamp: Date.now() + fiveMinutes,
};

export const postTwo: DbData = {
  data: { id: 2, post: 'mock post' },
  timestamp: Date.now() + fiveMinutes,
};

export const postThree: DbData = {
  data: { id: 3, post: 'mock post' },
  timestamp: Date.now() + fiveMinutes,
};

export const postFour: DbData = {
  data: { id: 1, post: 'mock post' },
  timestamp: Date.now() - fiveMinutes,
};

export const postFive: DbData = {
  data: { id: 2, post: 'mock post' },
  timestamp: Date.now() - fiveMinutes,
};

export const postSix: DbData = {
  data: { id: 3, post: 'mock post' },
  timestamp: Date.now() - fiveMinutes,
};

export class RedisStore implements Store {
  set(_key: string, _data: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }

  get(_key: string): Promise<DbData> {
    throw new Error('Method not implemented.');
  }

  getAll(): Promise<Record<string, DbData>> {
    throw new Error('Method not implemented.');
  }

  remove(_key: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
