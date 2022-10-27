import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Header, Calendar, Todo } from '../components';
import { viewHeight } from '../stores';

const Main = () => {
  const vh = useRecoilValue(viewHeight);

  return (
    <Box>
      <Header />
      <Content vh={vh}>
        <Calendar />
        <Todo />
      </Content>
    </Box>
  );
};

export default Main;

const Box = styled.main`
  display: flex;
  flex-direction: column;
`;

const Content = styled.section<{ vh: number }>`
  height: ${(props) => `${props.vh * 100 - 64 + 'px'}`};
  display: flex;
  margin-top: 64px;
`;
