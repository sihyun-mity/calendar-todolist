import { addYears, format, subYears } from 'date-fns';
import { HTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { useMountEffect } from '../hooks';

const DatePicker = (props?: HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);

  const pushDate = () => {
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
  };

  useMountEffect(() => pushDate(), { beforeRender: true });

  return (
    <Box {...props} onClick={(e) => e.stopPropagation()}>
      <List>
        {years.map((ele, idx) => (
          <Item key={idx}>{ele}</Item>
        ))}
      </List>
      <List>
        {months.map((ele, idx) => (
          <Item key={idx}>{ele}</Item>
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

const Item = styled.li`
  padding: 2px 6px;
  border-radius: 6px;
  color: ${({ theme }) => theme.color['grey-800']};

  ${({ theme }) => theme.font.Body1Label};
  ${({ theme }) => theme.ui.hover_bg};
`;
