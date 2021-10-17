import React from "react";
import { HashRouter, Switch } from "react-router-dom";
import { AppContextProvider as Provider } from "@components/Context";
import TopNavbar from "@components/TopNavbar";
import Route from "@components/RouteWithLayout";
import SubToolbar from "@components/SubToolbar";
import MainRouteComponent from "@routes/MainRoute";
import SettingsRouteComponent from "@routes/SettingsRoute";
import styled from "styled-components";

const CustomRouter = (): JSX.Element => {
  return (
    <HashRouter>
      <Provider>
        <Switch>
          <Layout>
            <TopNavbar />
            <Route path="/" exact component={MainRouteComponent} />
            <Route path="/settings" exact component={SettingsRouteComponent} />
            <SubToolbar />
          </Layout>
        </Switch>
      </Provider>
    </HashRouter>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default CustomRouter;
