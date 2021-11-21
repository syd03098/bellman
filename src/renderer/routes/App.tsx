import React from "react";
import { AppContextProvider as Provider } from "@components/Context";
import { Provider as ReakitProvider } from "reakit";
import { css, ThemeProvider } from "styled-components";
import { lightTheme } from "@theme/index";
import Router from "@routes/Router";

const App = (): JSX.Element => {
  return (
    <ReakitProvider>
      <ThemeProvider theme={lightTheme}>
        <Provider>
          <Router cssProps={cssFlexColumn} />
        </Provider>
      </ThemeProvider>
    </ReakitProvider>
  );
};

const cssFlexColumn = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default App;
