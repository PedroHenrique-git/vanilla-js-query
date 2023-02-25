import localforage from 'localforage';
import { DB_NAME, STORE_NAME } from '../constants';
import { DbData, Store } from '../typings';
export class IndexedDBStore implements Store {
  private _storage: LocalForage = localforage;

  constructor() {
    this.setConfig();
  }

  private setConfig() {
    this._storage.config({
      driver: localforage.INDEXEDDB,
      name: STORE_NAME,
      storeName: DB_NAME,
    });
  }

  getAll(): Promise<Record<string, DbData>> {
    return new Promise((resolve, reject) => {
      const result: Record<string, DbData> = {};

      this._storage
        .iterate((value, key) => {
          result[key] = value as DbData;
        })
        .then(() => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  set(key: string, data: DbData): Promise<void> {
    return new Promise((resolve, reject) => {
      this._storage
        .setItem(key, data)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(key: string): Promise<DbData> {
    return new Promise((resolve, reject) => {
      this._storage
        .getItem(key)
        .then((data) => {
          resolve(data as DbData);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._storage
        .removeItem(key)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
