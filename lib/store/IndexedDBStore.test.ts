import { postOne, postThree, postTwo } from '../mock';
import { IndexedDBStore } from './IndexedDBStore';

describe('IndexedDBStore', () => {
  const store = new IndexedDBStore();

  it('should store all data correctly', async () => {
    await store.set('post-one', postOne);
    await store.set('post-two', postTwo);
    await store.set('post-three', postThree);

    const storedPostOne = await store.get('post-one');
    const storedPostTwo = await store.get('post-two');
    const storedPostThree = await store.get('post-three');

    expect(storedPostOne).toEqual(postOne);
    expect(storedPostTwo).toEqual(postTwo);
    expect(storedPostThree).toEqual(postThree);
  });

  it('should get all data storage', async () => {
    const allData = await store.getAll();

    expect(allData).toEqual({
      'post-one': postOne,
      'post-two': postTwo,
      'post-three': postThree,
    });
  });

  it('should return null for invalids keys', async () => {
    const storedPostFour = await store.get('post-four');
    const storedPostFive = await store.get('post-five');
    const storedPostSix = await store.get('post-six');

    expect(storedPostFour).toBeNull();
    expect(storedPostFive).toBeNull();
    expect(storedPostSix).toBeNull();
  });

  it('should remove data correctly', async () => {
    await store.remove('post-one');
    await store.remove('post-two');
    await store.remove('post-three');

    const storedPostOne = await store.get('post-one');
    const storedPostTwo = await store.get('post-two');
    const storedPostThree = await store.get('post-three');

    expect(storedPostOne).toBeNull();
    expect(storedPostTwo).toBeNull();
    expect(storedPostThree).toBeNull();
  });
});
