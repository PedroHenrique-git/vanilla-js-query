import localforage from 'localforage';
import {
  postOne,
  postThree,
  postTwo,
  postFive,
  postFour,
  postSix,
} from '../mock';
import { IndexedDBStore } from '../store/IndexedDBStore';
import { LocalStorageStore } from '../store/LocalStorageStore';
import { DbData, Store } from '../typings';
import { Db } from './db';

describe('DB', () => {
  const db = new Db();

  const dbLocalStorage = new Db({
    persist: true,
    persistorType: 'localStorage',
  });

  const dbIndexedDb = new Db({
    persist: true,
    persistorType: 'IndexedDB',
  });

  const cache = {
    'post-one': postOne,
    'post-two': postTwo,
    'post-three': postThree,
    'post-four': postFour,
    'post-five': postFive,
    'post-six': postSix,
  };

  const errorMessage = (key: string) => {
    return `${key} does not exists in cache`;
  };

  const isInstanceOfStore = (store: Store) => {
    return (
      'set' in store && 'get' in store && 'getAll' in store && 'remove' in store
    );
  };

  it('should init store correctly', () => {
    try {
      new Db({ persist: true, persistorType: 'invalid' });
    } catch (err) {
      const castedErr = err as { message: string; code: number };
      expect(castedErr.message).toBe('Invalid persistorType');
    }

    try {
      new Db({ persist: true, persistorType: 'customDB' });
    } catch (err) {
      const castedErr = err as { message: string; code: number };
      expect(castedErr.message).toBe('Invalid CustomDB');
    }

    expect(
      dbLocalStorage.store instanceof LocalStorageStore &&
        isInstanceOfStore(dbLocalStorage.store),
    ).toBe(true);

    expect(
      dbIndexedDb.store instanceof IndexedDBStore &&
        isInstanceOfStore(dbIndexedDb.store),
    ).toBe(true);
  });

  it('should store all data correctly', async () => {
    await db.add('post-one', postOne.data, postOne.timestamp);
    await db.add('post-two', postTwo.data, postTwo.timestamp);
    await db.add('post-three', postThree.data, postThree.timestamp);
    await db.add('post-four', postFour.data, postFour.timestamp);
    await db.add('post-five', postFive.data, postFive.timestamp);
    await db.add('post-six', postSix.data, postSix.timestamp);

    const storedPostOne = await db.get('post-one');
    const storedPostTwo = await db.get('post-two');
    const storedPostThree = await db.get('post-three');
    const storedPostFour = await db.get('post-four');
    const storedPostFive = await db.get('post-five');
    const storedPostSix = await db.get('post-six');

    expect(storedPostOne).toEqual(postOne);
    expect(storedPostTwo).toEqual(postTwo);
    expect(storedPostThree).toEqual(postThree);
    expect(storedPostFour).toEqual(postFour);
    expect(storedPostFive).toEqual(postFive);
    expect(storedPostSix).toEqual(postSix);
  });

  it('should store all data in cacheData and localStorage', async () => {
    localforage.config({
      driver: localforage.LOCALSTORAGE,
    });

    await dbLocalStorage.add('post-one', postOne.data, postOne.timestamp);
    await dbLocalStorage.add('post-two', postTwo.data, postTwo.timestamp);
    await dbLocalStorage.add('post-three', postThree.data, postThree.timestamp);
    await dbLocalStorage.add('post-four', postFour.data, postFour.timestamp);
    await dbLocalStorage.add('post-five', postFive.data, postFive.timestamp);
    await dbLocalStorage.add('post-six', postSix.data, postSix.timestamp);

    const storedPostOne = await dbLocalStorage.get('post-one');
    const storedPostTwo = await dbLocalStorage.get('post-two');
    const storedPostThree = await dbLocalStorage.get('post-three');
    const storedPostFour = await dbLocalStorage.get('post-four');
    const storedPostFive = await dbLocalStorage.get('post-five');
    const storedPostSix = await dbLocalStorage.get('post-six');

    expect(storedPostOne).toEqual(postOne);

    localforage.getItem('post-one', (_, value) => {
      expect(value).toEqual(postOne);
    });

    expect(storedPostTwo).toEqual(postTwo);

    localforage.getItem('post-two', (_, value) => {
      expect(value).toEqual(postTwo);
    });

    expect(storedPostThree).toEqual(postThree);

    localforage.getItem('post-three', (_, value) => {
      expect(value).toEqual(postThree);
    });

    expect(storedPostFour).toEqual(postFour);

    localforage.getItem('post-four', (_, value) => {
      expect(value).toEqual(postFour);
    });

    expect(storedPostFive).toEqual(postFive);

    localforage.getItem('post-five', (_, value) => {
      expect(value).toEqual(postFive);
    });

    expect(storedPostSix).toEqual(postSix);

    localforage.getItem('post-six', (_, value) => {
      expect(value).toEqual(postSix);
    });
  });

  it('should store all data in cacheData and indexeddb', async () => {
    localforage.config({
      driver: localforage.INDEXEDDB,
    });

    await dbIndexedDb.add('post-one', postOne.data, postOne.timestamp);
    await dbIndexedDb.add('post-two', postTwo.data, postTwo.timestamp);
    await dbIndexedDb.add('post-three', postThree.data, postThree.timestamp);
    await dbIndexedDb.add('post-four', postFour.data, postFour.timestamp);
    await dbIndexedDb.add('post-five', postFive.data, postFive.timestamp);
    await dbIndexedDb.add('post-six', postSix.data, postSix.timestamp);

    const storedPostOne = await dbIndexedDb.get('post-one');
    const storedPostTwo = await dbIndexedDb.get('post-two');
    const storedPostThree = await dbIndexedDb.get('post-three');
    const storedPostFour = await dbIndexedDb.get('post-four');
    const storedPostFive = await dbIndexedDb.get('post-five');
    const storedPostSix = await dbIndexedDb.get('post-six');

    expect(storedPostOne).toEqual(postOne);

    localforage.getItem('post-one', (_, value) => {
      expect(value).toEqual(postOne);
    });

    expect(storedPostTwo).toEqual(postTwo);

    localforage.getItem('post-two', (_, value) => {
      expect(value).toEqual(postTwo);
    });

    expect(storedPostThree).toEqual(postThree);

    localforage.getItem('post-three', (_, value) => {
      expect(value).toEqual(postThree);
    });

    expect(storedPostFour).toEqual(postFour);

    localforage.getItem('post-four', (_, value) => {
      expect(value).toEqual(postFour);
    });

    expect(storedPostFive).toEqual(postFive);

    localforage.getItem('post-five', (_, value) => {
      expect(value).toEqual(postFive);
    });

    expect(storedPostSix).toEqual(postSix);

    localforage.getItem('post-six', (_, value) => {
      expect(value).toEqual(postSix);
    });
  });

  it('should contain correctly data in cacheData', () => {
    expect(db.cache).toEqual(new Map<string, DbData>(Object.entries(cache)));
  });

  it('should return true for stored keys', () => {
    expect(db.has('post-one')).toBe(true);
    expect(db.has('post-two')).toBe(true);
    expect(db.has('post-three')).toBe(true);
  });

  it('should return false for not stored keys', () => {
    expect(db.has('post-seven')).toBe(false);
    expect(db.has('post-eight')).toBe(false);
    expect(db.has('post-nine')).toBe(false);
  });

  it('should return true for future times', async () => {
    expect(await db.isValid('post-one')).toBe(true);
    expect(await db.isValid('post-two')).toBe(true);
    expect(await db.isValid('post-three')).toBe(true);
  });

  it('should return false for past times', async () => {
    expect(await db.isValid('post-four')).toBe(false);
    expect(await db.isValid('post-five')).toBe(false);
    expect(await db.isValid('post-six')).toBe(false);
  });

  it('should remove all data from cache', async () => {
    await db.remove('post-one');
    await db.remove('post-two');
    await db.remove('post-three');
    await db.remove('post-four');
    await db.remove('post-five');
    await db.remove('post-six');

    db.get('post-one').catch((err) =>
      expect(err.message).toBe(errorMessage('post-one')),
    );

    db.get('post-two').catch((err) =>
      expect(err.message).toBe(errorMessage('post-two')),
    );

    db.get('post-three').catch((err) =>
      expect(err.message).toBe(errorMessage('post-three')),
    );

    db.get('post-four').catch((err) =>
      expect(err.message).toBe(errorMessage('post-four')),
    );

    db.get('post-five').catch((err) =>
      expect(err.message).toBe(errorMessage('post-five')),
    );

    db.get('post-six').catch((err) =>
      expect(err.message).toBe(errorMessage('post-six')),
    );
  });
});
