import React from "react";
import { CssPropsType } from "@library/global";
import IntervalSelect from "@components/containers/IntervalSelect";
import CoursePopover from "@components/containers/CoursePopover";
import ToggleSound from "@components/containers/ToggleSound";

interface Props {
  cssProps: CssPropsType;
}

const SettingsRoute = ({ cssProps: cssFlexFull }: Props): JSX.Element => {
  return (
    <section css={cssFlexFull}>
      <IntervalSelect />
      <ToggleSound />
      <CoursePopover />
    </section>
  );
};

export default SettingsRoute;
