import React, { lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@theme/index";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyles from "@components/GlobalStyles";

const MainRouteComponent = lazy(() => import("@routes/MainRoute"));

const { github } = window.electronOnly;

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Suspense fallback={<div />}>
            <Route path="/" exact component={MainRouteComponent} />
          </Suspense>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
