import styled from 'styled-components';
import { useCalendar } from '../hooks';
import Days from './Days';

const Calendar = (): JSX.Element => {
  const calendar = useCalendar();
  const prev = calendar.getPrev();
  const now = calendar.getNow();
  const next = calendar.getNext();

  return (
    <Box>
      <Days />
      <Board>
        {prev.map((ele, idx) => (
          <PrevItem key={idx}>
            <Day>{ele}</Day>
          </PrevItem>
        ))}
        {now.map((ele, idx) => (
          <NowItem key={idx}>
            <Day>{ele}</Day>
          </NowItem>
        ))}
        {next.map((ele, idx) => (
          <NextItem key={idx}>
            <Day>{ele}</Day>
          </NextItem>
        ))}
      </Board>
    </Box>
  );
};

export default Calendar;

const Box = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Board = styled.div`
  height: calc(100% - 32px);
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  width: calc(100% / 7);
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  box-sizing: border-box;
  text-align: center;
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
