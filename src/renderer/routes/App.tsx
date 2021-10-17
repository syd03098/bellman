import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@theme/index";
import { Provider as ReakitProvider } from "reakit";
import GlobalStyles from "@components/GlobalStyles";
import Router from "@routes/CustomRouter";

const App = (): JSX.Element => {
  return (
    <ReakitProvider>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </ReakitProvider>
  );
};

export default App;
