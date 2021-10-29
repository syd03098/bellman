import React from "react";
import { useAppContext } from "@components/Context";
import IntervalSelectSection from "@components/containers/IntervalSelectSection";
import CoursePopover from "@components/containers/CoursePopover";
import styled from "styled-components";

const SettingsRoute = (): JSX.Element => {
  const { settings } = useAppContext();

  return (
    <Wrap>
      <IntervalSelectSection interval={settings.interval} />
      <CoursePopover />
    </Wrap>
  );
};

const Wrap = styled.article`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
`;

export default SettingsRoute;
