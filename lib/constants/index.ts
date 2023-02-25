export const DB_NAME = 'JS_QUERY_CACHE';
export const STORE_NAME = 'JS_CACHE';
export const fiveMinutes = 5 * 60 * 1000;

export const defaultConfig: DB = {
  persist: false,
  cacheTime: fiveMinutes,
  persistorType: 'localStorage',
};
