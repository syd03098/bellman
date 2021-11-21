import React from "react";
import { CssPropsType } from "@library/global";
import { useAppContext } from "@components/Context";
import IntervalSelectSection from "@components/containers/IntervalSelectSection";
import ToggleSoundSection from "@components/containers/ToggleSoundSection";
import CoursePopover from "@components/containers/CoursePopover";

interface Props {
  cssProps: CssPropsType;
}

const SettingsRoute = ({ cssProps: cssFlexFull }: Props): JSX.Element => {
  const { interval, playSound } = useAppContext();

  return (
    <section css={cssFlexFull}>
      <IntervalSelectSection interval={interval} />
      <ToggleSoundSection isPlaySound={playSound} />
      <CoursePopover />
    </section>
  );
};

export default SettingsRoute;
