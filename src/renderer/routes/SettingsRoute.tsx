import React from "react";
import { CssPropsType } from "@library/global";
import IntervalSelectSection from "@components/containers/IntervalSelectSection";
import ToggleSoundSection from "@components/containers/ToggleSoundSection";
import CoursePopover from "@components/containers/CoursePopover";

interface Props {
  cssProps: CssPropsType;
}

const SettingsRoute = ({ cssProps: cssFlexFull }: Props): JSX.Element => {
  return (
    <section css={cssFlexFull}>
      <IntervalSelectSection />
      <ToggleSoundSection />
      <CoursePopover />
    </section>
  );
};

export default SettingsRoute;
