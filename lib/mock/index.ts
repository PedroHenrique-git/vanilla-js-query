import { fiveMinutes } from '../constants';
import { DbData } from '../typings';

export const postOne: DbData = {
  data: { id: 1, post: 'mock post' },
  timestamp: Date.now() + fiveMinutes,
};

export const postTwo: DbData = {
  data: { id: 2, post: 'mock post' },
  timestamp: Date.now() + fiveMinutes,
};

export const postThree: DbData = {
  data: { id: 3, post: 'mock post' },
  timestamp: Date.now() + fiveMinutes,
};

export const postFour: DbData = {
  data: { id: 1, post: 'mock post' },
  timestamp: Date.now() - fiveMinutes,
};

export const postFive: DbData = {
  data: { id: 2, post: 'mock post' },
  timestamp: Date.now() - fiveMinutes,
};

export const postSix: DbData = {
  data: { id: 3, post: 'mock post' },
  timestamp: Date.now() - fiveMinutes,
};
