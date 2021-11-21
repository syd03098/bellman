import React from "react";
import { CssPropsType } from "@library/global";

interface Props {
  cssProps: CssPropsType;
}

const MainRoute = ({ cssProps: cssFlexFull }: Props): JSX.Element => {
  return (
    <section css={cssFlexFull}>
      <>hello worlds</>
    </section>
  );
};

export default MainRoute;
