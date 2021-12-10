import React, { useCallback, useMemo } from "react";
import { useAppContext } from "@components/Context";
import { CssPropsType } from "@library/global";
import { Group } from "reakit/Group";
import ReactCountdown, { CountdownRenderProps } from "react-countdown";
import styled, { css, useTheme } from "styled-components";
import useIpcListener from "@hooks/useIpcListener";
import Spinner from "@components/Spinner";
import Button from "@components/button";

interface Props {
  cssProps: CssPropsType;
}

const { openExternalCanvas } = window.electronOnly;

const SubToolbar = ({ cssProps: cssFlexEnd }: Props): JSX.Element => {
  const { courses, interval, updateResults } = useAppContext();
  const theme = useTheme();

  const date = interval ? Date.now() + interval * 60 * 1000 : Date.now();
  const timerDisabled = useMemo(
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
      <ReactCountdown
        date={date}
        autoStart={false}
        onComplete={() => openExternalCanvas(true)}
        renderer={(props) => (
          <CountdownButtons
            startNowDisabled={timerDisabled}
            timerDisabled={courses.length === 0}
            onUpdateResults={updateResults}
            {...props}
          />
        )}
      />
    </section>
  );
};

type CountdownButtonsProps = {
  onUpdateResults: () => void;
  startNowDisabled: boolean;
  timerDisabled: boolean;
} & CountdownRenderProps;

const CountdownButtons = ({
  onUpdateResults,
  startNowDisabled,
  timerDisabled,
  ...props
}: CountdownButtonsProps) => {
  const { api: methods, completed } = props;
  const { start, stop, isStopped, isStarted } = methods;

  const onCanvasClosed = useCallback(
    (restart: boolean) => {
      onUpdateResults();

      if (restart) {
        start();
      }
    },
    [onUpdateResults, start]
  );

  useIpcListener({
    channel: "canvas-closed",
    handler: onCanvasClosed,
  });

  if (completed) {
    return <Spinner />;
  }

  return (
    <ButtonsGroup aria-label="buttons to open canvas">
      {isStarted() && (
        <Button variant="danger" onClick={stop}>
          타이머정지
        </Button>
      )}
      {isStopped() && (
        <>
          <Button
            variant="primary"
            disabled={startNowDisabled}
            onClick={() => openExternalCanvas()}
          >
            운동바로시작
          </Button>
          <Button variant="smoke" disabled={timerDisabled} onClick={start}>
            타이머시작
          </Button>
        </>
      )}
    </ButtonsGroup>
  );
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
