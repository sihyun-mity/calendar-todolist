import styled from 'styled-components';

const Todo = (): JSX.Element => {
  return <Box>Todo Sample</Box>;
};

export default Todo;

const Box = styled.aside`
  flex: 1;
  border-left: 1px solid ${({ theme }) => theme.color['grey-200']};
  box-sizing: border-box;
`;
