import styled from 'styled-components';
import Days from './Days';

const Calendar = (): JSX.Element => {
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
