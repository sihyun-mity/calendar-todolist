import styled, { css } from 'styled-components';
import { useMountEffect } from '../hooks';

interface TimePickerPropsType extends React.HTMLAttributes<HTMLDivElement> {
  time: string[];
  func: (type: 'hour' | 'minute', value: string) => void;
}

const TimePicker = (props: TimePickerPropsType): JSX.Element => {
  const { time, func } = props;
  const hours: string[] = new Array(24)
    .fill(null)
    .map((ele, idx) => (++idx).toString());
  const minutes: string[] = new Array(60)
    .fill(null)
    .map((ele, idx) =>
      idx.toString().length === 1 ? '0' + idx.toString() : idx.toString()
    );

  const focusDate = (): void => {
    const listHeight = document.querySelector(Box.toString())?.clientHeight;
    const yearPosition = document.getElementById(
      'TimePicker-Hour-' + time[0]
    )?.offsetTop;
    const monthPosition = document.getElementById(
      'TimePicker-Minute-' + time[1]
    )?.offsetTop;

    if (yearPosition && monthPosition && listHeight) {
      document
        .getElementById('TimePicker-Hour')
        ?.scrollTo(0, yearPosition - listHeight / 2);

      document
        .getElementById('TimePicker-Minute')
        ?.scrollTo(0, monthPosition - listHeight / 2);
    }
  };

  useMountEffect(() => focusDate());

  return (
    <Box {...props} onClick={(e) => e.stopPropagation()}>
      <List id="TimePicker-Hour">
        {hours.map((ele, idx) => (
          <Item
            id={'TimePicker-Hour-' + ele}
            key={idx}
            selected={ele === time[0]}
            onClick={() => func('hour', ele)}
          >
            {ele}
          </Item>
        ))}
      </List>
      <List id="TimePicker-Minute">
        {minutes.map((ele, idx) => (
          <Item
            id={'TimePicker-Minute-' + ele}
            key={idx}
            selected={ele === time[1]}
            onClick={() => func('minute', ele)}
          >
            {ele}
          </Item>
        ))}
      </List>
    </Box>
  );
};

export default TimePicker;

const Box = styled.div`
  width: max-content;
  display: flex;
  position: fixed;
  right: 16px;
  z-index: 1;
  margin-top: calc(0.875rem + 6px);
  padding: 3px 4px;
  border-radius: 6px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  cursor: initial;
`;

const List = styled.ul`
  max-height: 18vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &:first-of-type {
    margin-right: 4px;
  }
`;

const Item = styled.li<{ selected: boolean }>`
  padding: 2px 6px;
  border-radius: 6px;
  color: ${({ theme }) => theme.color['grey-800']};

  ${({ theme }) => theme.font.Body3Label};
  ${({ theme }) => theme.ui.hover_bg};

  ${(props) =>
    props.selected &&
    css`
      background-color: ${props.theme.color['grey-200']};
    `}

  &:not(:last-of-type) {
    margin-bottom: 2px;
  }
`;
