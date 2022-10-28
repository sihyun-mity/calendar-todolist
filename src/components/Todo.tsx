import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { formattingDate } from '../stores';
import { TodoDataModel } from '../types/TodoDataModel';
import TodoEditor from './TodoEditor';
import TodoHandler from './TodoHandler';

const Todo = (): JSX.Element => {
  const yyyymmdd = useRecoilValue(formattingDate);
  const [makeTodo, setMakeTodo] = useState<boolean>(false);
  const data: TodoDataModel = JSON.parse(
    window.localStorage.getItem('todo') || '{}'
  );

  return (
    <Box>
      <TodoHandler makeTodo={setMakeTodo} />
      <List>
        {makeTodo && <TodoEditor onComplete={() => setMakeTodo(false)} />}
        {data[yyyymmdd]?.map((ele, idx) => (
          <TodoEditor key={idx} value={ele.value} />
        ))}
      </List>
    </Box>
  );
};

export default Todo;

const Box = styled.aside`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-left: 1px solid ${({ theme }) => theme.color['grey-200']};
  box-sizing: border-box;
`;

const List = styled.ul`
  overflow-y: scroll;
`;
