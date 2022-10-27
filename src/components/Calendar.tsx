import { addMonths, format, setDate, subMonths } from 'date-fns';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useCalendar } from '../hooks';
import { date } from '../stores';
import Days from './Days';

const Calendar = (): JSX.Element => {
  const [targetDate, setTargetDate] = useRecoilState(date);
  const formattingDate: string = useMemo(
    () => format(targetDate, 'yyyyMMdd'),
    [targetDate]
  );
  const calendar = useCalendar();
  const prev = calendar.getPrev();
  const now = calendar.getNow();
  const next = calendar.getNext();

  const handleDate = (e: React.MouseEvent<HTMLDivElement>): void => {
    const element: string[] = Array.from(
      (e.target as HTMLDivElement).classList
    );
    const targetClass: string[] =
      element
        .find((item) => /date-/.test(item))
        ?.split('-')[1]
        .split('') || [];

    targetClass.splice(4, 0, '-');
    targetClass.splice(7, 0, '-');

    setTargetDate(new Date(targetClass.join('')));
  };

  return (
    <Box>
      <Days />
      <Board date={formattingDate} onClick={(e) => handleDate(e)}>
        {prev.map((ele, idx) => (
          <PrevItem
            className={`date-${format(
              subMonths(setDate(targetDate, ele), 1),
              'yyyyMMdd'
            )}`}
            key={idx}
          >
            <Day>{ele}</Day>
          </PrevItem>
        ))}
        {now.map((ele, idx) => (
          <NowItem
            className={`date-${format(setDate(targetDate, ele), 'yyyyMMdd')}`}
            key={idx}
          >
            <Day>{ele}</Day>
          </NowItem>
        ))}
        {next.map((ele, idx) => (
          <NextItem
            className={`date-${format(
              addMonths(setDate(targetDate, ele), 1),
              'yyyyMMdd'
            )}`}
            key={idx}
          >
            <Day>{ele}</Day>
          </NextItem>
        ))}
      </Board>
    </Box>
  );
};

export default Calendar;

const Box = styled.article`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const Board = styled.div<{ date: string }>`
  height: calc(100% - 32px);
  display: flex;
  flex-wrap: wrap;

  & > .date-${(props) => props.date} {
    background-color: ${({ theme }) => theme.color['grey-200']};
  }
`;

const Item = styled.div`
  width: calc(100% / 7);
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  box-sizing: border-box;
  text-align: center;

  ${({ theme }) => theme.ui.hover_bg};

  &:not(:nth-of-type(7n)) {
    border-right: 1px solid ${({ theme }) => theme.color['grey-200']};
  }

  &:not(:nth-of-type(-n + 7)) {
    border-top: 1px solid ${({ theme }) => theme.color['grey-200']};
  }
`;

const PrevItem = styled(Item)`
  color: ${({ theme }) => theme.color['grey-500']};
`;

const NowItem = styled(Item)`
  color: ${({ theme }) => theme.color['grey-700']};
`;

const NextItem = styled(Item)`
  color: ${({ theme }) => theme.color['grey-500']};
`;

const Day = styled.label``;
