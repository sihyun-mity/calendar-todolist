import { format } from 'date-fns';
import { selector } from 'recoil';
import { date } from './atoms';

export const formattingDate = selector<string>({
  key: 'formattingDate',
  get: ({ get }) => format(get(date), 'yyyyMMdd'),
});
