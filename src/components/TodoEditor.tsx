import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { useMountEffect } from '../hooks';
import { formattingDate } from '../stores';
import { TodoDataModel } from '../types/TodoDataModel';

interface TodoEditorPropsType {
  value?: any;
  onComplete?: () => void;
}

interface StyledPropsType {
  [props: string]: any;
}

const TodoEditor = (props: TodoEditorPropsType) => {
  const { value, onComplete } = props;
  const yyyymmdd = useRecoilValue(formattingDate);
  const [focus, setFocus] = useState<boolean>(false);
  const data: TodoDataModel = JSON.parse(
    window.localStorage.getItem('todo') || '{}'
  );

  const saveTodo = (value?: string) => {
    if (value) {
      let todoObj: TodoDataModel;

      if (data[yyyymmdd]) {
        todoObj = {
          [yyyymmdd]: [...data?.[yyyymmdd], { time: '18:00', value }],
        };
      } else {
        todoObj = {
          [yyyymmdd]: [{ time: '18:00', value }],
        };
      }

      window.localStorage.setItem(
        'todo',
        JSON.stringify({ ...data, ...todoObj })
      );
    }
    onComplete && onComplete();
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    /Escape|Enter/g.test(e.key) &&
      saveTodo((e.target as HTMLInputElement).value);
  };

  useMountEffect(() => {
    if (!value) {
      (document.querySelector(Input.toString()) as HTMLInputElement).focus();
      setFocus(true);
    }
  });

  return (
    <Box focus={focus}>
      <Input
        type="text"
        defaultValue={value}
        onBlur={(e) => saveTodo(e.target.value)}
        onKeyDown={(e) => handleKeydown(e)}
      />
    </Box>
  );
};

export default TodoEditor;

const Box = styled.li<StyledPropsType>`
  border-bottom: 1px solid ${({ theme }) => theme.color['grey-200']};
  box-sizing: border-box;
  transition: border-bottom 200ms;

  ${(props) =>
    props.focus &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.color['grey-400']};
    `}

  &:not(:first-of-type) {
    margin-top: 12px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0 0 6px;
  border: 0;
  box-sizing: border-box;
  color: ${({ theme }) => theme.color['grey-700']};
  ${({ theme }) => theme.font.Body2Paragraph};

  &:focus {
    outline: 0;
  }
`;
