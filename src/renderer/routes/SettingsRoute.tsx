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
  const { settings } = useAppContext();

  return (
    <section css={cssFlexFull}>
      <IntervalSelectSection interval={settings.interval} />
      <ToggleSoundSection isPlaySound={settings.playSound} />
      <CoursePopover />
    </section>
  );
};

export default SettingsRoute;
