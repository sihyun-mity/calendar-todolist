import { addMonths, format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import leftArrow from '../assets/images/left-arrow.png';
import rightArrow from '../assets/images/right-arrow.png';
import { date } from '../stores';
import DatePicker from './DatePicker';

const Header = (): JSX.Element => {
  const [targetDate, setTargetDate] = useRecoilState(date);
  const [openPicker, setOpenPicker] = useState<boolean>(false);

  const handleWindow = (e: MouseEvent) =>
    !document
      .querySelector('.DatePicker-Header')
      ?.contains(e?.target as HTMLElement) && setOpenPicker(false);

  useEffect(() => {
    if (openPicker) {
      window.addEventListener('mousedown', handleWindow);
    } else {
      window.removeEventListener('mousedown', handleWindow);
    }

    return () => window.removeEventListener('mousedown', handleWindow);
  }, [openPicker]);

  return (
    <Box>
      <Content>
        <ControlBtn onClick={() => setTargetDate((prev) => subMonths(prev, 1))}>
          <Arrow src={leftArrow} />
        </ControlBtn>
        <Title>
          <HeadingDate onClick={() => setOpenPicker((prev) => !prev)}>
            {format(targetDate, 'Y년 MMM', { locale: ko })}
          </HeadingDate>
          {openPicker && <DatePicker className="DatePicker-Header" />}
        </Title>
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
  background-color: #fff;
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

const Title = styled.div`
  position: relative;
  margin: 0 2px;

  // For DatePicker
  & > div {
    margin-left: 8px;
  }
`;

const HeadingDate = styled.h1`
  ${({ theme }) => theme.font.Heading6Medium};
  padding: 4px 8px;
  margin: 0;
  color: ${({ theme }) => theme.color['grey-600']};
  border-radius: 6px;

  ${({ theme }) => theme.ui.hover_bg};
`;

const ControlBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: unset;
  border-radius: 6px;
  background-color: unset;

  ${({ theme }) => theme.ui.hover_bg};
`;

const Arrow = styled.img`
  width: 16px;
  height: 16px;
  filter: invert(33%) sepia(11%) saturate(654%) hue-rotate(176deg)
    brightness(94%) contrast(95%);
`;
