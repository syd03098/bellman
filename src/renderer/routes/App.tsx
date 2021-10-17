import React, { lazy, Suspense } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "@theme/index";
import { HashRouter as Router, Switch } from "react-router-dom";
import GlobalStyles from "@components/GlobalStyles";
import SubToolbar from "@components/SubToolbar";
import Route from "@components/RouteWithLayout";

const MainRouteComponent = lazy(() => import("@routes/MainRoute"));
const SettingsRouteComponent = lazy(() => import("@routes/SettingsRoute"));

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Router>
        <Layout>
          <Switch>
            <Suspense fallback={<div />}>
              <Route path="/" exact component={MainRouteComponent} />
              <Route
                path="/settings"
                exact
                component={SettingsRouteComponent}
              />
              <SubToolbar />
            </Suspense>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default App;
