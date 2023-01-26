import { DB_NAME, STORE_NAME } from '../constants';

export class IndexedDBStore implements Store {
  private connect(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (typeof window === undefined) {
        reject('window not available');
      }

      if (!('indexedDB' in window)) {
        reject('indexedDB not available');
      }

      const request = window.indexedDB.open(DB_NAME, 1);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject('error when trying to open DB');
      };

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
            autoIncrement: false,
          });
        }

        resolve(db);
      };
    });
  }

  private returnErrorMessage(operationName: string) {
    return `error when trying to ${operationName} from IndexedDB`;
  }

  getAll(): Promise<Record<string, DbData>> {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        const result: Record<string, DbData> = {};
        const transaction = db?.transaction([STORE_NAME]);
        const objectStore = transaction?.objectStore(STORE_NAME);
        const request = objectStore.openCursor();

        request.onerror = () => {
          reject(this.returnErrorMessage('getAllFromIndexedDB'));
        };

        request.onsuccess = () => {
          const cursor = request.result;

          if (cursor) {
            console.log(cursor.primaryKey, cursor.value);
            result[String(cursor.primaryKey)] = cursor.value;
            cursor.continue();
          } else {
            resolve(result);
          }
        };
      });
    });
  }

  set(key: string, data: DbData): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const objectStore = transaction?.objectStore(STORE_NAME);
        const request = objectStore.put(data, key);

        request.onerror = () => {
          reject(this.returnErrorMessage('set'));
        };

        request.onsuccess = () => {
          resolve();
        };
      });
    });
  }

  async get(key: string): Promise<DbData> {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        const transaction = db.transaction([STORE_NAME]);
        const objectStore = transaction?.objectStore(STORE_NAME);
        const request = objectStore.get(key);

        request.onerror = () => {
          reject(this.returnErrorMessage('get'));
        };

        request.onsuccess = () => {
          resolve(request?.result);
        };
      });
    });
  }

  remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const objectStore = transaction.objectStore(STORE_NAME);
        const request = objectStore.delete(key);

        request.onerror = () => {
          reject(this.returnErrorMessage('remove'));
        };

        request.onsuccess = () => {
          resolve();
        };
      });
    });
  }
}
