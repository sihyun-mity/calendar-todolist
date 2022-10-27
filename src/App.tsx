import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useMountEffect } from './hooks';
import { Main } from './pages';
import { viewHeight } from './stores';
import { optimizeEvent } from './utils';

const App = (): JSX.Element => {
  const setVh = useSetRecoilState(viewHeight);

  const calculateViewHeight = (): void => setVh(window.innerHeight * 0.01);

  useMountEffect(() => {
    calculateViewHeight();
    window.addEventListener('resize', optimizeEvent(calculateViewHeight));

    return () => {
      window.removeEventListener('resize', optimizeEvent(calculateViewHeight));
    };
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="calendar-todolist" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
