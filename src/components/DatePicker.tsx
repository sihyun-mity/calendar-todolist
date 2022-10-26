import { addYears, format, subYears } from 'date-fns';
import styled from 'styled-components';
import { useMountEffect } from '../hooks';
// import Select from './Select';

const years: number[] = [];
const months: number[] = [];

const DatePicker = () => {
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
  };

  useMountEffect(() => pushDate(), { beforeRender: true });

  return (
    <Box>
      {/* <Select /> */}
      {/* <Select /> */}
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
`;
