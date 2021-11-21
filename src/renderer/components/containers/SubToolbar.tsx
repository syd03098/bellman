import React from "react";
import Button from "@components/button";
import styled, { css, useTheme } from "styled-components";
import { CssPropsType } from "@library/global";

interface Props {
  cssProps: CssPropsType;
}

const SubToolbar = ({ cssProps: cssFlexEnd }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <section
      css={css`
        ${cssFlexEnd};
        height: 32px;
        background-color: ${theme.layout.subHeader};
        border-top: 1px solid ${theme.border.white};
        padding: 0 12px;
      `}
    >
      <Right>
        <Button variant="primary" size="sm">
          Exercise now
        </Button>
        <Button variant="smoke" size="sm">
          Start Timer
        </Button>
      </Right>
    </section>
  );
};

const Right = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0 -4px;
`;

export default SubToolbar;
