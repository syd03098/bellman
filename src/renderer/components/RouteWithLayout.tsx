import React, { ElementType } from "react";
import { Route, RouteProps } from "react-router-dom";
import styled from "styled-components";

type RoutesWithLayoutProps = {
  component: ElementType;
} & Omit<RouteProps, "component">;

const RouteWithLayout = ({
  component: Component,
  ...rest
}: RoutesWithLayoutProps): JSX.Element => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Root>
          <Component {...props} />
        </Root>
      )}
    />
  );
};

const Root = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export default RouteWithLayout;
