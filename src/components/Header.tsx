import styled from 'styled-components';

const Header = () => {
  return (
    <Box>
      <Content>
        <HeadingDate>Header</HeadingDate>
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
  padding: 12px 24px;
  box-sizing: border-box;
`;

const HeadingDate = styled.h1`
  ${({ theme }) => theme.font.Heading6Medium};
  margin: 0;
  color: ${({ theme }) => theme.color['grey-600']};
`;
