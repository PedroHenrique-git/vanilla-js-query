import { Store } from './store';

const oneHour = 5 * 60 * 1000;

export class Db {
  private _cacheData: Record<string, DbData> = {};
  private _cacheTime = 0;
  private _persist = false;
  private _store: Store | null = null;

  private addTime(time: number) {
    return new Date().valueOf() + time;
  }

  constructor(persist = false, cacheTime = oneHour) {
    this._cacheTime = cacheTime;
    this._persist = persist;

    if (this._persist) {
      this._store = new Store();
      this._cacheData = this._store.get();
    }
  }

  get cache() {
    return this._cacheData;
  }

  get cacheTime() {
    return this._cacheTime;
  }

  get(key: string) {
    if (!this.has(key)) {
      throw new Error(`${key} does not exists in cache`);
    }

    const cachedData = this._persist
      ? this._store?.get()[key]
      : this._cacheData[key];

    if (this._persist && !this.isValid(key)) {
      this._store?.set(this._cacheData);

      return this._cacheData[key];
    }

    return cachedData;
  }

  add(key: string, data: unknown, timestamp = oneHour) {
    this._cacheData[key] = { data, timestamp: this.addTime(timestamp) };

    if (this._persist) {
      this._store?.set(this._cacheData);
    }
  }

  remove(key: string) {
    if (!this.has(key)) {
      throw new Error(`${key} does not exists in cache`);
    }

    delete this._cacheData[key];

    if (this._persist) {
      this._store?.set(this._cacheData);
    }
  }

  has(key: string) {
    return !!this._cacheData[key];
  }

  isValid(key: string) {
    if (!this.has(key)) {
      throw new Error(`${key} does not exists in cache`);
    }

    const now = new Date().valueOf();

    if (this._persist) {
      const cachedData = this._store?.get()[key];

      return !cachedData ? false : cachedData.timestamp >= now;
    }

    const cachedData = this._cacheData[key];

    return cachedData.timestamp >= now;
  }
}
