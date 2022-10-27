import styled from 'styled-components';

const Days = (): JSX.Element => (
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

export default Days;

const Box = styled.header`
  height: 32px;
  display: flex;
  align-items: center;
`;

const Day = styled.label`
  width: calc(100% / 7);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  ${({ theme }) => theme.font.Body3Label};
  color: ${({ theme }) => theme.color['grey-400']};

  &:not(:last-of-type) {
    border-right: 1px solid ${({ theme }) => theme.color['grey-200']};
  }
`;
