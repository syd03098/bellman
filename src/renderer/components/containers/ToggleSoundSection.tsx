import React, { useCallback } from "react";
import { useAppContext } from "@components/Context";
import { flexSpaceBetween } from "@library/styleFunctions";
import styled from "styled-components";
import Checkbox from "@components/Checkbox";

interface Props {
  isPlaySound: boolean;
}

const ToggleSoundSection = ({ isPlaySound }: Props): JSX.Element => {
  const { setSettings } = useAppContext();

  const onChange = useCallback(() => {
    setSettings((prev) => {
      return { ...prev, playSound: !prev.playSound };
    });
  }, [setSettings]);

  return (
    <Section>
      <Title>사운드</Title>
      <Checkbox checked={isPlaySound} onChange={onChange} />
    </Section>
  );
};

const Section = styled.section`
  ${flexSpaceBetween};

  padding-top: 16px;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.bold};
  margin: 0;
  user-select: none;
`;

export default ToggleSoundSection;
