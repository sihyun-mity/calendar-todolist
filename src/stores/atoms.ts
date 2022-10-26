import { atom } from 'recoil';

export const date = atom<Date>({
  key: 'date',
  default: new Date(),
});
