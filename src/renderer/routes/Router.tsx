import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { flexSpaceBetween } from "@library/styleFunctions";
import { CssPropsType } from "@library/global";
import { css } from "styled-components";
import SettingsRouteComponent from "@routes/SettingsRoute";
import MainRouteComponent from "@routes/MainRoute";
import GlobalStyles from "@components/GlobalStyles";
import SubToolbar from "@components/containers/SubToolbar";
import TopNavbar from "@components/containers/TopNavbar";

interface Props {
  cssProps: CssPropsType;
}

const Router = ({ cssProps: cssFlexColumn }: Props): JSX.Element => {
  return (
    <HashRouter>
      <GlobalStyles />
      <main css={cssFlexColumn}>
        <TopNavbar cssProps={cssFlexSpaceBetween} />
        <Routes>
          <Route
            path="/"
            element={<MainRouteComponent cssProps={cssFlexFull} />}
          />
          <Route
            path="/settings"
            element={<SettingsRouteComponent cssProps={cssFlexFull} />}
          />
        </Routes>
        <SubToolbar />
      </main>
    </HashRouter>
  );
};

const cssFlexSpaceBetween = css`
  ${flexSpaceBetween};
  flex-wrap: wrap;
  padding: 8px 12px;
`;

const cssFlexFull = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 0 12px;
`;

export default Router;
