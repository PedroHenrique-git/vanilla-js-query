const BLACK_LIST_KEYS = [
  'clear',
  'getItem',
  'key',
  'length',
  'removeItem',
  'setItem',
];

export class LocalStorageStore implements Store {
  set(key: string, data: unknown): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  get(key: string): Promise<DbData> {
    return new Promise((resolve, reject) => {
      try {
        const storeData = localStorage.getItem(key);

        if (storeData) {
          resolve(JSON.parse(storeData) as DbData);
        } else {
          reject(`${key} does not exists on localStorage`);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  getAll(): Promise<Record<string, DbData>> {
    return new Promise((resolve, reject) => {
      try {
        const storage = localStorage;
        const result: Record<string, DbData> = {};

        for (const key in storage) {
          if (BLACK_LIST_KEYS.includes(key)) {
            continue;
          }

          result[key] = JSON.parse(storage[key]);
        }

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem(key);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
