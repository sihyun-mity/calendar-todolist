import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { date, formattingDate, getTodo } from '../stores';
import plus from '../assets/images/plus.png';

interface TodoHandlerPropsType {
  makeTodo: React.Dispatch<React.SetStateAction<boolean>>;
  editTodo: EditTodoProperty;
}

type EditTodoProperty = {
  status: boolean;
  handler: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoHandler = (props: TodoHandlerPropsType): JSX.Element => {
  const { makeTodo, editTodo } = props;
  const { status, handler } = editTodo;
  const yyyymmdd = useRecoilValue(formattingDate);
  const data = useRecoilValue(getTodo);
  const targetDate = useRecoilValue(date);
  const today = format(targetDate, 'd eeee', { locale: ko });

  return (
    <Box>
      <Date>{today}</Date>
      <Controller onMouseDown={(e) => e.stopPropagation()}>
        {data?.[yyyymmdd]?.[0] && (
          <EditBtn onClick={() => handler((prev) => !prev)}>
            {status ? '완료' : '편집'}
          </EditBtn>
        )}
        <PlusBtn
          src={plus}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            handler(false);
            makeTodo(true);
          }}
        />
      </Controller>
    </Box>
  );
};

export default TodoHandler;

const Box = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Date = styled.h1`
  margin: 0;
  ${({ theme }) => theme.font.Heading4Bold};
  color: ${({ theme }) => theme.color['grey-800']};
`;

const Controller = styled.div`
  display: flex;
  align-items: center;
`;

const EditBtn = styled.button`
  padding: 2px;
  border: 0;
  box-sizing: border-box;
  color: ${({ theme }) => theme.color['blue-600']};

  ${({ theme }) => theme.font.Body1Label};
`;

const PlusBtn = styled.img`
  width: 24px;
  height: 24px;
  padding: 2px;
  margin-left: 6px;
  cursor: pointer;
`;
