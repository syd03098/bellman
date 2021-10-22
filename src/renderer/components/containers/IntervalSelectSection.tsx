import React, { useCallback, MouseEvent, useMemo } from "react";
import { defaultIntervalOptions, Interval } from "@library/settings";
import { useAppContext } from "@components/Context";
import { Nullable } from "@library/global";
import styled from "styled-components";
import ReactSelect from "@components/ReactSelect";
import useIpcListener from "@hooks/useIpcListener";

interface Props {
  settings: Nullable<Interval>;
}

const { electronOnly } = window;

const IntervalSelectSection = ({ settings }: Props): JSX.Element => {
  const { setSettings } = useAppContext();

  const options = useMemo(() => [...defaultIntervalOptions], []);
  const selectedValue = options
    .map((option) => option.value)
    .find((minutes) => minutes === settings?.value);

  const title = useMemo(() => {
    return "알람 간격";
  }, []);

  const selectContents = useMemo(() => {
    if (settings === null) {
      return "select...";
    }
    return <>{settings.title}</>;
  }, [settings]);

  const onResponse = useCallback(
    (event: Event, value: Interval) => {
      setSettings((prev) => {
        return { ...prev, interval: value };
      });
    },
    [setSettings]
  );

  const onSelectHandler = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      electronOnly.showIntervalOptionsDropdown({
        options,
        selectedValue,
      });
    },
    [options, selectedValue]
  );

  useIpcListener({
    channel: "interval-options-dropdown-response",
    listener: onResponse,
  });

  return (
    <Section>
      <Title>{title}</Title>
      <ReactSelect onSelect={onSelectHandler}>{selectContents}</ReactSelect>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.bold};
  margin: 0;
`;

export default IntervalSelectSection;
