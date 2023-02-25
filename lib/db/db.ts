import { defaultConfig, fiveMinutes } from '../constants';
import { IndexedDBStore } from '../store/IndexedDBStore';
import { LocalStorageStore } from '../store/LocalStorageStore';
import { CustomDB, DB, DbData, persistType, Store } from '../typings';

export class Db {
  private _cacheData: Map<string, DbData> = new Map();
  private _cacheTime = 0;
  private _persist = false;
  private _store: Store | null = null;
  private _persistorType: persistType = 'localStorage';

  private addTime(time: number) {
    return new Date().valueOf() + time;
  }

  constructor({
    cacheTime,
    persist,
    persistorType,
    CustomDB,
  }: DB = defaultConfig) {
    this._cacheTime = cacheTime ?? fiveMinutes;
    this._persist = persist ?? false;
    this._persistorType = persistorType ?? 'localStorage';

    if (this._persist) {
      this.initStore(CustomDB);
      this.updateCacheFromPersistor();
    }
  }

  private initStore(CustomDB: CustomDB | undefined) {
    switch (this._persistorType) {
      case 'IndexedDB':
        this._store = new IndexedDBStore();
        break;
      case 'localStorage':
        this._store = new LocalStorageStore();
        break;
      case 'customDB':
        if (CustomDB) {
          this._store = new CustomDB();
          return;
        }

        throw new Error('Invalid CustomDB');
      default:
        throw new Error('Invalid persistorType');
    }
  }

  private async updateCacheFromPersistor() {
    const cacheData = await this._store?.getAll();

    if (!cacheData) return;

    for (const [key, dbData] of Object.entries(cacheData)) {
      this._cacheData.set(key, dbData);
    }
  }

  get store() {
    return this._store;
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

    return this._cacheData.get(key);
  }

  async add(key: string, data: unknown, timestamp = this.addTime(fiveMinutes)) {
    this._cacheData.set(key, { data, timestamp });

    if (this._persist) {
      await this._store?.set(key, { data, timestamp });
    }
  }

  async remove(key: string) {
    if (!this.has(key)) {
      throw new Error(`${key} does not exists in cache`);
    }

    this._cacheData.delete(key);

    if (this._persist) {
      await this._store?.remove(key);
    }
  }

  has(key: string) {
    return !!this._cacheData.get(key);
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

    const cachedData = this._cacheData.get(key);

    return !cachedData ? false : cachedData.timestamp >= now;
  }
}
