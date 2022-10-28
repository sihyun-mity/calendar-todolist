import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { useMountEffect } from '../hooks';
import { formattingDate, getTodo } from '../stores';
import { TodoDataModel } from '../types/TodoDataModel';

interface TodoEditorPropsType {
  value?: any;
  onComplete?: () => void;
  index?: number;
}

interface StyledPropsType {
  [props: string]: any;
}

const TodoEditor = (props: TodoEditorPropsType) => {
  const { value, onComplete, index } = props;
  const yyyymmdd = useRecoilValue(formattingDate);
  const [focus, setFocus] = useState<boolean>(false);
  const [data, setData] = useRecoilState(getTodo);

  const saveTodo = (text?: string) => {
    setFocus(false);

    if (text) {
      let todoObj: TodoDataModel = {};

      // 기존 Todo 업데이트 확인 조건문
      if (value && index !== undefined) {
        todoObj = {
          [yyyymmdd]: data[yyyymmdd].map((ele, idx) =>
            Object.assign({}, ele, idx === index && { value: text })
          ),
        };
      } else {
        // 기존 배열 데이터 확인 조건문
        if (data[yyyymmdd]) {
          todoObj = {
            [yyyymmdd]: [...data[yyyymmdd], { time: '18:00', value: text }],
          };
        } else {
          todoObj = {
            [yyyymmdd]: [{ time: '18:00', value: text }],
          };
        }
      }

      setData({ ...data, ...todoObj });
    }

    onComplete && onComplete();
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (/Escape|Enter/g.test(e.key)) {
      saveTodo((e.target as HTMLInputElement).value);
      (document.querySelector(Input.toString()) as HTMLInputElement).blur();
    }
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
        onBlur={(e) => focus && saveTodo(e.target.value)}
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
