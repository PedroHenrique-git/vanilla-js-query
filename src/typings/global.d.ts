type Db = import('../db/db').Db;
type Store = import('../db/store').Store;

type Loading = boolean;

interface QueryResponse<T> {
  data: T | null;
  error: string | null;
  loading: Loading;
}

interface DbData {
  data: unknown;
  timestamp: number;
}
