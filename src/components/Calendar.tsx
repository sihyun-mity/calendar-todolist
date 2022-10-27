import styled from 'styled-components';
import { useCalendar } from '../hooks';
import Days from './Days';

const Calendar = (): JSX.Element => {
  const calendar = useCalendar();

  console.log(calendar.get());

  return (
    <Box>
      <Days />
    </Box>
  );
};

export default Calendar;

const Box = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
