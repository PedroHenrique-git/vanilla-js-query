type Db = import('../db/db').Db;

type Loading = boolean;

interface Store {
  set(_key: string, _data: unknown): Promise<void>;
  get(_key: string): Promise<DbData>;
  getAll(): Promise<Record<string, DbData>>;
  remove(_key: string): Promise<void>;
}

interface QueryResponse<T> {
  data: T | null;
  error: string | null;
  loading: Loading;
}

interface DbData {
  data: unknown;
  timestamp: number;
}
