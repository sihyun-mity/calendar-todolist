import { format } from 'date-fns';
import { selector } from 'recoil';
import { TodoDataModel } from '../types/TodoDataModel';
import { date, todo } from './atoms';

export const formattingDate = selector<string>({
  key: 'formattingDate',
  get: ({ get }) => format(get(date), 'yyyyMMdd'),
});

export const getTodo = selector<TodoDataModel>({
  key: 'getTodo',
  get: ({ get }) => JSON.parse(get(todo) || '{}'),
  set: ({ set }, newValue) => {
    const value = JSON.stringify(newValue);
    set(todo, value);
    window.localStorage.setItem('todo', value);
  },
});
