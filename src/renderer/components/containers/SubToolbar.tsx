import React, { useCallback, useState } from "react";
import ReactCountdown, { CountdownRenderProps } from "react-countdown";
import styled, { css, useTheme } from "styled-components";
import { useAppContext } from "@components/Context";
import { CssPropsType } from "@library/global";
import { Group } from "reakit/Group";
import useIpcListener from "@hooks/useIpcListener";
import Button from "@components/button";

interface Props {
  cssProps: CssPropsType;
}

const { openExternalCanvas } = window.electronOnly;

const SubToolbar = ({ cssProps: cssFlexEnd }: Props): JSX.Element => {
  const [canvasOpened, setOpened] = useState<boolean>(false);
  const { courses, interval, updateResults } = useAppContext();
  const theme = useTheme();

  const date = interval ? Date.now() + interval * 60 * 1000 : Date.now();

  const onCanvasClosed = useCallback(() => {
    updateResults();
    setOpened(false);
  }, [updateResults]);

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
        onComplete={async () => {
          await openExternalCanvas(true);
          setOpened(true);
        }}
        renderer={(props) => (
          <CountdownButtons
            isTimerDisabled={
              canvasOpened || courses.length === 0 || interval === null
            }
            isStartNowDisabled={canvasOpened || courses.length === 0}
            onCloseCanvas={onCanvasClosed}
            onOpenCanvas={() => setOpened(true)}
            {...props}
          />
        )}
      />
    </section>
  );
};

type CountdownButtonsProps = {
  onCloseCanvas: () => void;
  onOpenCanvas: () => void;
  isTimerDisabled: boolean;
  isStartNowDisabled: boolean;
} & CountdownRenderProps;

const CountdownButtons = ({
  onCloseCanvas,
  onOpenCanvas,
  isStartNowDisabled,
  isTimerDisabled,
  ...props
}: CountdownButtonsProps) => {
  const { api } = props;
  const { start, stop, isStarted } = api;

  const onCanvasClosed = useCallback(
    (restart: boolean) => {
      onCloseCanvas();

      if (restart) {
        start();
      }
    },
    [onCloseCanvas, start]
  );

  useIpcListener({
    channel: "canvas-closed",
    handler: onCanvasClosed,
  });

  const handleOpenCanvasNow = useCallback(async () => {
    await openExternalCanvas();
    onOpenCanvas();
  }, [onOpenCanvas]);

  const handleSetTimeout = useCallback(() => {
    start();
    onOpenCanvas();
  }, [onOpenCanvas, start]);

  return (
    <ButtonsGroup aria-label="buttons to control canvas">
      {isStarted() && (
        <Button variant="danger" onClick={stop}>
          타이머정지
        </Button>
      )}
      {!isStarted() && (
        <>
          <Button
            variant="primary"
            disabled={isStartNowDisabled}
            onClick={handleOpenCanvasNow}
          >
            운동바로시작
          </Button>
          <Button
            variant="smoke"
            disabled={isTimerDisabled}
            onClick={handleSetTimeout}
          >
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
