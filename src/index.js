import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';

import theme from './utils/theme';
import Home from './components/home';

// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Home />
  </ThemeProvider>,
  document.getElementById('root')
);
