import { addYears, format, subYears } from 'date-fns';
import { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { useMountEffect } from '../hooks';
import { date } from '../stores';

const DatePicker = (props?: HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [targetDate, setTargetDate] = useRecoilState(date);

  const pushDate = (): void => {
    // Cleanup
    years.splice(0);
    months.splice(0);

    const nowDate: Date = new Date();

    for (
      let yearIdx = Number(format(subYears(nowDate, 50), 'yyyy'));
      yearIdx <= Number(format(addYears(nowDate, 25), 'yyyy'));
      yearIdx++
    ) {
      years.push(yearIdx);
    }

    for (let monthIdx = 1; monthIdx <= 12; monthIdx++) {
      months.push(monthIdx);
    }

    setYears([...years]);
    setMonths([...months]);
    setReady(true);
  };

  const focusDate = useCallback((): void => {
    const listHeight = document.querySelector(Box.toString())?.clientHeight;
    const yearPosition = document.getElementById(
      'DatePicker-Year-' + Number(format(targetDate, 'yyyy'))
    )?.offsetTop;
    const monthPosition = document.getElementById(
      'DatePicker-Month-' + Number(format(targetDate, 'M'))
    )?.offsetTop;

    if (yearPosition && monthPosition && listHeight) {
      document
        .getElementById('DatePicker-Year')
        ?.scrollTo(0, yearPosition - listHeight / 2);

      document
        .getElementById('DatePicker-Month')
        ?.scrollTo(0, monthPosition - listHeight / 2);
    }
  }, [targetDate]);

  useMountEffect(() => pushDate(), { beforeRender: true });

  useEffect(() => {
    ready && focusDate();
  }, [ready, focusDate]);

  return (
    <Box {...props} onClick={(e) => e.stopPropagation()}>
      <List id="DatePicker-Year">
        {years.map((ele, idx) => (
          <Item
            id={'DatePicker-Year-' + ele}
            key={idx}
            selected={ele === Number(format(targetDate, 'yyyy'))}
          >
            {ele}
          </Item>
        ))}
      </List>
      <List id="DatePicker-Month">
        {months.map((ele, idx) => (
          <Item
            id={'DatePicker-Month-' + ele}
            key={idx}
            selected={ele === Number(format(targetDate, 'M'))}
          >
            {ele}
          </Item>
        ))}
      </List>
    </Box>
  );
};

export default DatePicker;

const Box = styled.div`
  width: max-content;
  display: flex;
  position: absolute;
  left: 0;
  z-index: 1;
  padding: 6px 8px;
  border-radius: 6px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  cursor: initial;
`;

const List = styled.ul`
  max-height: 20vmin;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &:first-of-type {
    margin-right: 12px;
  }
`;

const Item = styled.li<{ selected: boolean }>`
  padding: 2px 6px;
  border-radius: 6px;
  color: ${({ theme }) => theme.color['grey-800']};

  ${({ theme }) => theme.font.Body1Label};
  ${({ theme }) => theme.ui.hover_bg};

  ${(props) =>
    props.selected &&
    css`
      background-color: ${props.theme.color['grey-200']};
    `}
`;
