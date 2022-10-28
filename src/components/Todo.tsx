import styled from 'styled-components';
import TodoHandler from './TodoHandler';

const Todo = (): JSX.Element => {
  return (
    <Box>
      <TodoHandler />
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
