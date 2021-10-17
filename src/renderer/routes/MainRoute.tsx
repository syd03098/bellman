import React from "react";
import styled from "styled-components";

const { github } = window.electronOnly;

const MainRoute = (): JSX.Element => {
  return (
    <StyledButton onClick={() => github()}>ipcRenderer.invoke</StyledButton>
  );
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;

  border-radius: 4px;
  border: 1px solid;
`;

export default MainRoute;
