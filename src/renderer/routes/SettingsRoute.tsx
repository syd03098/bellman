import React from "react";
import { useAppContext } from "@components/Context";
import styled from "styled-components";
import IntervalSelectSection from "@components/containers/IntervalSelectSection";

const SettingsRoute = (): JSX.Element => {
  const { settings } = useAppContext();

  return (
    <Wrap>
      <IntervalSelectSection interval={settings.interval} />
    </Wrap>
  );
};

const Wrap = styled.article`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
`;

export default SettingsRoute;
