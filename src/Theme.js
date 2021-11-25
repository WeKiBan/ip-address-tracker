import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  breakpoints: {
    mobile: '832px',
    tablet: '1023px',
    desktop: '1024px',

  },
  colors: {
    lightGrey: 'hsl(0, 0%, 59%)',
    darkGrey: 'hsl(0, 0%, 17%)',
    warningRed: '#df4759',
  },
  font: {
    fontFamily: "font-family: 'Rubik', sans-serif",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
