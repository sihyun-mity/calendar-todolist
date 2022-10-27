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
          <PrevItem key={idx}>{ele}</PrevItem>
        ))}
        {now.map((ele, idx) => (
          <NowItem key={idx}>{ele}</NowItem>
        ))}
        {next.map((ele, idx) => (
          <NextItem key={idx}>{ele}</NextItem>
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
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  width: calc(100% / 7);
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
