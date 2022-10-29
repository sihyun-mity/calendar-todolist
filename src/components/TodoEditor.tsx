import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { useMountEffect } from '../hooks';
import { formattingDate, getTodo } from '../stores';
import { TodoDataModel, TodoItemModel } from '../types/TodoDataModel';
import minus from '../assets/images/minus.png';
import TimePicker from './TimePicker';
import { format } from 'date-fns';

interface TodoEditorPropsType {
  item?: TodoItemModel;
  onComplete?: () => void;
  index?: number;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoEditor = (props: TodoEditorPropsType): JSX.Element => {
  const { item, onComplete, index, edit, setEdit } = props;
  const yyyymmdd = useRecoilValue(formattingDate);
  const [focus, setFocus] = useState<boolean>(false);
  const [data, setData] = useRecoilState(getTodo);
  const [time, setTime] = useState<string>(
    item?.time || format(new Date(), 'k:mm')
  );

  const saveTodo = (text?: string): void => {
    setFocus(false);

    if (text) {
      let todoObj: TodoDataModel = {};

      // 기존 Todo 업데이트 확인 조건문
      if (item && index !== undefined) {
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

      setData((prev) => ({ ...prev, ...todoObj }));
    }

    onComplete && onComplete();
  };

  const removeTodo = (index: number): void => {
    const todoObj = {
      [yyyymmdd]: data[yyyymmdd].filter((ele, idx) => idx !== index),
    };

    setData((prev) => ({ ...prev, ...todoObj }));
  };

  const handleDate = (type: 'hour' | 'minute', value: string): void => {
    if (type === 'hour') {
      console.log(value);
      // setTargetDate(new Date(`${value}-${targetMonth}-01`));
    } else {
      // setTargetDate(new Date(`${targetYear}-${value}-01`));
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (/Escape|Enter/g.test(e.key)) {
      saveTodo((e.target as HTMLInputElement).value);
      e.currentTarget.blur();
    }
  };

  useMountEffect(() => {
    if (!item) {
      (document.querySelector(Input.toString()) as HTMLInputElement).focus();
      setFocus(true);
    }
  });

  return (
    <Box focus={focus}>
      <EditBox>
        <Input
          type="text"
          defaultValue={item?.value}
          onFocus={() => {
            setEdit && setEdit(false);
            setFocus(true);
          }}
          onBlur={(e) => focus && saveTodo(e.target.value)}
          onKeyDown={(e) => handleKeydown(e)}
        />
        <Time>
          <TimeDisplay>{time}</TimeDisplay>
          {/* {item?.time && (
        <TimePicker
          time={item?.time.split(':')}
          func={(type, value) => handleDate(type, value)}
        />
      )} */}
        </Time>
      </EditBox>
      {edit && (
        <Remove onClick={() => index !== undefined && removeTodo(index)}>
          <RemoveIcon src={minus} />
        </Remove>
      )}
    </Box>
  );
};

export default TodoEditor;

const Box = styled.li<{ focus: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
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

const EditBox = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Time = styled.button`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2px;
  margin-bottom: 6px;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  ${({ theme }) => theme.ui.hover_bg};
`;

const TimeDisplay = styled.label`
  cursor: inherit;
  color: ${({ theme }) => theme.color['blue-800']};
  ${({ theme }) => theme.font.Body3Label};
`;

const Remove = styled.button`
  margin-left: 8px;
  padding: 2px;
  border: 0;
`;

const RemoveIcon = styled.img`
  width: 18px;
  height: 18px;
`;
