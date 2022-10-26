import styled from 'styled-components';
import { Calendar, Header, Todo } from './components';

const App = (): JSX.Element => {
  return (
    <Box>
      <Header />
      <Content>
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

const Content = styled.section`
  display: flex;
  margin-top: 64px;
`;
