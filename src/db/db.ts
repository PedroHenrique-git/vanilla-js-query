import { IndexedDBStore } from '../store/IndexedDBStore';
import { LocalStorageStore } from '../store/LocalStorageStore';

const fiveMinutes = 5 * 60 * 1000;

type persistType = 'localStorage' | 'IndexedDB';

interface DB {
  persist?: boolean;
  cacheTime?: number;
  persistorType?: persistType;
}

const defaultConfig: DB = {
  persist: false,
  cacheTime: fiveMinutes,
  persistorType: 'localStorage',
};

export class Db {
  private _cacheData: Record<string, DbData> = {};
  private _cacheTime = 0;
  private _persist = false;
  private _store: Store | null = null;
  private _persistorType: persistType = 'localStorage';

  private addTime(time: number) {
    return new Date().valueOf() + time;
  }

  constructor({ cacheTime, persist, persistorType }: DB = defaultConfig) {
    this._cacheTime = cacheTime ?? fiveMinutes;
    this._persist = persist ?? false;
    this._persistorType = persistorType ?? 'localStorage';

    if (this._persist) {
      this._store =
        this._persistorType === 'localStorage'
          ? new LocalStorageStore()
          : new IndexedDBStore();

      this.updateCacheFromPersistor();
    }
  }

  private async updateCacheFromPersistor() {
    this._cacheData = (await this._store?.getAll()) ?? {};
  }

  get cache() {
    return this._cacheData;
  }

  get cacheTime() {
    return this._cacheTime;
  }

  async get(key: string) {
    if (!this.has(key)) {
      throw new Error(`${key} does not exists in cache`);
    }

    if (this._persist && (await this.isValid(key))) {
      return await this._store?.get(key);
    }

    return this._cacheData[key];
  }

  async add(key: string, data: unknown, timestamp = fiveMinutes) {
    const expireTime = this.addTime(timestamp);

    this._cacheData[key] = { data, timestamp: expireTime };

    if (this._persist) {
      await this._store?.set(key, { data, timestamp: expireTime });
    }
  }

  async remove(key: string) {
    if (!this.has(key)) {
      throw new Error(`${key} does not exists in cache`);
    }

    delete this._cacheData[key];

    if (this._persist) {
      await this._store?.remove(key);
    }
  }

  has(key: string) {
    return !!this._cacheData[key];
  }

  async isValid(key: string) {
    if (!this.has(key)) {
      throw new Error(`${key} does not exists in cache`);
    }

    const now = new Date().valueOf();

    if (this._persist) {
      const storeData = await this._store?.get(key);

      return !storeData ? false : storeData.timestamp >= now;
    }

    const cachedData = this._cacheData[key];

    return cachedData.timestamp >= now;
  }
}
