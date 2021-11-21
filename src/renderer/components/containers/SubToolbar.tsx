import React, { useCallback, useMemo } from "react";
import { useAppContext } from "@components/Context";
import { CssPropsType } from "@library/global";
import { ProgramStatus } from "@library/program";
import { Group } from "reakit/Group";
import Spinner from "@components/Spinner";
import Button from "@components/button";
import styled, { css, useTheme } from "styled-components";

interface Props {
  cssProps: CssPropsType;
}

const { openExternalCanvas } = window.electronOnly;

const SubToolbar = ({ cssProps: cssFlexEnd }: Props): JSX.Element => {
  const theme = useTheme();
  const { courses, interval } = useAppContext();

  const disabled = useMemo(
    () => courses.length === 0 || interval === null,
    [courses, interval]
  );

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
      <ButtonsGroup aria-label="Buttons">
        <Buttons disabled={disabled} />
      </ButtonsGroup>
    </section>
  );
};

const Buttons = ({ disabled }: { disabled: boolean }): JSX.Element => {
  const {
    programStatus: status,
    setProgramStatus,
    toggleTimeout,
  } = useAppContext();

  const executeCanvas = useCallback(async () => {
    setProgramStatus(ProgramStatus.StartNow);
    await openExternalCanvas();
  }, [setProgramStatus]);

  if (status === ProgramStatus.Stopped) {
    return (
      <>
        <Button
          variant="primary"
          size="sm"
          disabled={disabled}
          onClick={executeCanvas}
        >
          Exercise now
        </Button>
        <Button
          variant="smoke"
          size="sm"
          disabled={disabled}
          onClick={toggleTimeout}
        >
          Start Timer
        </Button>
      </>
    );
  }
  if (status === ProgramStatus.Running) {
    return (
      <Button variant="danger" size="sm" onClick={toggleTimeout}>
        Stop Timer
      </Button>
    );
  }

  return <Spinner />;
};

const ButtonsGroup = styled(Group)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 -4px;
  gap: 4px;
`;

export default SubToolbar;
