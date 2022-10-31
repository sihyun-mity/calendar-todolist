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
  const [text, setText] = useState<string>(item?.value || '');
  const [time, setTime] = useState<string>(
    item?.time || format(new Date(), 'k:mm')
  );
  const [timeSelector, setTimeSelector] = useState<boolean>(false);

  const focusProcess = (): void => {
    setEdit && setEdit(false);
    setFocus(true);
  };

  const blurProcess = (): void => {
    setTimeSelector(false);
    saveTodo();
  };

  const saveTodo = (): void => {
    setFocus(false);

    if (text) {
      let todoObj: TodoDataModel = {};

      // 기존 Todo 업데이트 확인 조건문
      if (item && index !== undefined) {
        todoObj = {
          [yyyymmdd]: data[yyyymmdd]
            .map((ele, idx) =>
              Object.assign({}, ele, idx === index && { time, value: text })
            )
            .sort(
              (a, b) =>
                Number(a.time.replace(/:/g, '')) -
                Number(b.time.replace(/:/g, ''))
            ),
        };
      } else {
        // 기존 배열 데이터 확인 조건문
        if (data[yyyymmdd]) {
          todoObj = {
            [yyyymmdd]: [...data[yyyymmdd], { time, value: text }].sort(
              (a, b) =>
                Number(a.time.replace(/:/g, '')) -
                Number(b.time.replace(/:/g, ''))
            ),
          };
        } else {
          todoObj = {
            [yyyymmdd]: [{ time, value: text }],
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
    const timeArr = time.split(':');

    if (type === 'hour') {
      timeArr[0] = value;
    } else {
      timeArr[1] = value;
    }

    setTime(timeArr.join(':'));
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (/Escape|Enter/g.test(e.key)) {
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
      <EditBox onFocus={focusProcess} onBlur={blurProcess}>
        <Input
          type="text"
          defaultValue={item?.value}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => handleKeydown(e)}
          onClick={() => setTimeSelector(false)}
        />
        <Time
          onClick={() => setTimeSelector((prev) => !prev)}
          onMouseDown={(e) => onComplete && e.preventDefault()}
        >
          <TimeDisplay>{time}</TimeDisplay>
          {timeSelector && (
            <TimePicker
              time={time.split(':')}
              func={(type, value) => handleDate(type, value)}
            />
          )}
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
  position: relative;
  margin-bottom: 6px;
  margin-left: 8px;
  padding: 0;
  border: 0;
  border-radius: 4px;
`;

const TimeDisplay = styled.label`
  padding: 2px;
  border-radius: 4px;
  box-sizing: border-box;
  ${({ theme }) => theme.ui.hover_bg};
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
