import React from 'react';
import { useRecoilState } from 'recoil';
import { date } from './stores/atom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const App = (): JSX.Element => {
  const [now, setNow] = useRecoilState(date);
  console.log(now);
  console.log(format(now, 'PPP', { locale: ko }));

  return <div></div>;
};

export default App;
