import styled from 'styled-components';

const Days = (): JSX.Element => {
  return (
    <Box>
      <Day>일</Day>
      <Day>월</Day>
      <Day>화</Day>
      <Day>수</Day>
      <Day>목</Day>
      <Day>금</Day>
      <Day>토</Day>
    </Box>
  );
};

export default Days;

const Box = styled.header`
  height: 32px;
  display: flex;
  align-items: center;
`;

const Day = styled.label`
  width: calc(100% / 7);
  text-align: center;

  ${({ theme }) => theme.font.Body3Label};
  color: ${({ theme }) => theme.color['grey-500']};
`;
