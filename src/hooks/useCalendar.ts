import { getYear, getMonth } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { date } from '../stores';

export default function useCalendar() {
  const fullDate = useRecoilValue(date);
  const lastDateOfPrevMonth: Date = new Date(
    getYear(fullDate),
    getMonth(fullDate),
    0
  );
  const lastDateOfCurrentMonth: Date = new Date(
    getYear(fullDate),
    getMonth(fullDate) + 1,
    0
  );
  const lastDateNumOfPrevMonth: number = lastDateOfPrevMonth.getDate();
  const lastDayNumOfPrevMonth: number = lastDateOfPrevMonth.getDay();
  const lastDateNumOfCurrentMonth: number = lastDateOfCurrentMonth.getDate();
  const lastDayNumOfCurrentMonth: number = lastDateOfCurrentMonth.getDay();

  const get = (): number[] => {
    const now = getNow();
    const prev = getPrev();
    const next = getNext();

    return prev.concat(now, next);
  };

  const getNow = (): number[] => {
    return Array.from(Array(lastDateNumOfCurrentMonth + 1).keys()).slice(1);
  };

  const getPrev = (): number[] => {
    const dates: number[] = [];

    for (let i = 0; i <= lastDayNumOfPrevMonth; i++) {
      dates.unshift(lastDateNumOfPrevMonth - i);
    }

    return dates;
  };

  const getNext = (): number[] => {
    const dates: number[] = [];

    for (let i = 1; i < 7 - lastDayNumOfCurrentMonth; i++) {
      dates.push(i);
    }

    return dates;
  };

  return { get, getNow, getPrev, getNext };
}
