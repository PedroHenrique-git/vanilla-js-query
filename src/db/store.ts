const KEY = 'JS_QUERY_CACHE';

export class Store {
  set(data: unknown) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  get(): Record<string, DbData> {
    const storageData = localStorage.getItem(KEY);

    return JSON.parse(storageData ?? '{}');
  }

  remove() {
    localStorage.removeItem(KEY);
  }
}
