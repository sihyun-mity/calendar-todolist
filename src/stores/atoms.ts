import { atom } from 'recoil';

export const viewHeight = atom<number>({
  key: 'viewHeight',
  default: window.innerHeight * 0.01,
});

export const date = atom<Date>({
  key: 'date',
  default: new Date(),
});

export const todo = atom<string | null>({
  key: 'todo',
  default: window.localStorage.getItem('todo'),
});
