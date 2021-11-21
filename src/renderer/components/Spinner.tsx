import React from "react";
import { css, keyframes, useTheme } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = (): JSX.Element => {
  const theme = useTheme();

  return (
    <div
      css={css`
        width: 20px;
        height: 20px;
        display: inline-block;
        border-radius: 50%;
        animation: ${rotate} 0.6s linear infinite;
        border-style: solid;
        border-color: transparent;
        border-left-color: ${theme.button.primary};
        border-left-width: 3px;
      `}
    />
  );
};

export default Spinner;
