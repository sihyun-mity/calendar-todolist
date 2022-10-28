import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { date } from '../stores';

const Todo = (): JSX.Element => {
  const targetDate = useRecoilValue(date);
  const today = format(targetDate, 'd eeee', { locale: ko });

  return (
    <Box>
      <Date>{today}</Date>
    </Box>
  );
};

export default Todo;

const Box = styled.aside`
  flex: 1;
  padding: 24px;
  border-left: 1px solid ${({ theme }) => theme.color['grey-200']};
  box-sizing: border-box;
`;

const Date = styled.h1`
  margin: 0;
  ${({ theme }) => theme.font.Heading4Bold};
  color: ${({ theme }) => theme.color['grey-800']};
`;
