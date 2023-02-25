import { DbData, Store } from '../typings';
import localforage from 'localforage';
import { STORE_NAME } from '../constants';

export class LocalStorageStore implements Store {
  private _storage: LocalForage = localforage;

  constructor() {
    this.setConfig();
  }

  private setConfig() {
    this._storage.config({
      driver: localforage.LOCALSTORAGE,
      name: STORE_NAME,
    });
  }

  set(key: string, data: unknown): Promise<void> {
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
