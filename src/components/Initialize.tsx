import React, { ReactElement } from 'react';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../assets/styles';

const Initialize = (props: { children: ReactNode }): ReactElement => {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <GlobalStyle />
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
};

export default Initialize;
