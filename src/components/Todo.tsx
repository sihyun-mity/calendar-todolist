import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { formattingDate, getTodo } from '../stores';
import TodoEditor from './TodoEditor';
import TodoHandler from './TodoHandler';

const Todo = (): JSX.Element => {
  const yyyymmdd = useRecoilValue(formattingDate);
  const [makeTodo, setMakeTodo] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<boolean>(false);
  const data = useRecoilValue(getTodo);

  const handleWindow = (e: MouseEvent): false | void =>
    !document
      .querySelector(List.toString())
      ?.contains(e?.target as HTMLElement) && setEditTodo(false);

  useEffect(() => {
    if (editTodo) {
      window.addEventListener('mousedown', handleWindow);
    } else {
      window.removeEventListener('mousedown', handleWindow);
    }

    return () => window.removeEventListener('mousedown', handleWindow);
  }, [editTodo]);

  return (
    <Box>
      <TodoHandler makeTodo={setMakeTodo} editTodo={setEditTodo} />
      <List>
        {makeTodo && <TodoEditor onComplete={() => setMakeTodo(false)} />}
        {data[yyyymmdd]?.map((ele, idx) => (
          <TodoEditor
            key={`todo-${yyyymmdd}-${idx}-${ele.value}`}
            value={ele.value}
            index={idx}
            edit={editTodo}
            setEdit={setEditTodo}
          />
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
  overflow-y: auto;
`;
