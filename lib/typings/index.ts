export type Db = import('../db/db').Db;

export type Loading = boolean;

export type persistType = 'localStorage' | 'IndexedDB' | 'customDB';

export type CustomDB = new () => Store;

export interface DB {
  persist?: boolean;
  cacheTime?: number;
  persistorType?: persistType;
  CustomDB?: CustomDB;
}

export interface Store {
  set(_key: string, _data: unknown): Promise<void>;
  get(_key: string): Promise<DbData>;
  getAll(): Promise<Record<string, DbData>>;
  remove(_key: string): Promise<void>;
}

export interface QueryResponse<T> {
  data: T | null;
  error: string | null;
  loading: Loading;
}

export interface DbData {
  data: unknown;
  timestamp: number;
}
