import { Db } from './db/db';

export default new Db({
  persist: true,
  persistorType: 'IndexedDB',
});
