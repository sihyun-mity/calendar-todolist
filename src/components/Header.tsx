import { addMonths, format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import leftArrow from '../assets/images/left-arrow.png';
import rightArrow from '../assets/images/right-arrow.png';
import { date } from '../stores/atom';

const Header = () => {
  const [targetDate, setTargetDate] = useRecoilState(date);

  return (
    <Box>
      <Content>
        <ControlBtn onClick={() => setTargetDate((prev) => subMonths(prev, 1))}>
          <Arrow src={leftArrow} />
        </ControlBtn>
        <HeadingDate>{format(targetDate, 'Y년 MMM', { locale: ko })}</HeadingDate>
        <ControlBtn onClick={() => setTargetDate((prev) => addMonths(prev, 1))}>
          <Arrow src={rightArrow} />
        </ControlBtn>
      </Content>
    </Box>
  );
};

export default Header;

const Box = styled.header`
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  border-bottom: 1px solid ${({ theme }) => theme.color['grey-200']};
  box-sizing: border-box;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px 24px;
  box-sizing: border-box;
`;

const HeadingDate = styled.h1`
  ${({ theme }) => theme.font.Heading6Medium};
  margin: 0;
  padding: 6px 8px;
  color: ${({ theme }) => theme.color['grey-600']};
  border-radius: 6px;
  cursor: pointer;
`;

const ControlBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: unset;
  background-color: unset;
  cursor: pointer;
`;

const Arrow = styled.img`
  width: 16px;
  height: 16px;
  filter: invert(33%) sepia(11%) saturate(654%) hue-rotate(176deg) brightness(94%) contrast(95%);
`;
