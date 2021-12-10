import React, { useCallback } from "react";
import { flexSpaceBetween, OptionTitle } from "@library/styleFunctions";
import { useAppContext } from "@components/Context";
import { css } from "styled-components";
import Checkbox from "@components/Checkbox";

const ToggleSound = (): JSX.Element => {
  const { setSettings, playSound } = useAppContext();

  const onChange = useCallback(() => {
    setSettings((prev) => {
      return { ...prev, playSound: !prev.playSound };
    });
  }, [setSettings]);

  return (
    <div
      css={css`
        ${flexSpaceBetween};
        padding-top: 16px;
      `}
    >
      <OptionTitle>사운드</OptionTitle>
      <Checkbox checked={playSound} onChange={onChange} />
    </div>
  );
};

export default ToggleSound;
