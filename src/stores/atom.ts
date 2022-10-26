import { atom } from 'recoil';

export const date = atom({
  key: 'date',
  default: Date.now(),
});
