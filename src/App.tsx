import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Calendar, Header, Todo } from './components';
import { useMountEffect } from './hooks';
import { viewHeight } from './stores';
import { optimizeEvent } from './utils';

const App = (): JSX.Element => {
  const [vh, setVh] = useRecoilState(viewHeight);

  const calculateViewHeight = (): void => setVh(window.innerHeight * 0.01);

  useMountEffect(() => {
    calculateViewHeight();
    window.addEventListener('resize', optimizeEvent(calculateViewHeight));

    return () => {
      window.removeEventListener('resize', optimizeEvent(calculateViewHeight));
    };
  });

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

export default App;

const Box = styled.main`
  display: flex;
  flex-direction: column;
`;

const Content = styled.section<{ vh: number }>`
  height: ${(props) => `${props.vh * 100 - 64 + 'px'}`};
  display: flex;
  margin-top: 64px;
`;
