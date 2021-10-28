import React, { useCallback, useMemo } from "react";
import { useAppContext } from "@components/Context";
import { Nullable } from "@library/global";
import { useMenuState } from "reakit/Menu";
import styled from "styled-components";
import ReactSelect from "@components/select";

interface Props {
  interval: Nullable<number>;
}

const IntervalSelectSection = ({ interval }: Props): JSX.Element => {
  const { setSettings, intervalOptions } = useAppContext();
  const selectProps = useMenuState({ placement: "bottom-end" });

  const selectedValue = intervalOptions.find(
    ({ value }) => value === interval
  )?.value;

  const onClick = useCallback(
    (value: number) => {
      setSettings((prev) => {
        return { ...prev, interval: value };
      });

      selectProps.hide();
    },
    [selectProps, setSettings]
  );

  const selectContents = useMemo(() => {
    if (interval === null) {
      return "select...";
    }

    const displayName = intervalOptions.find(
      ({ value }) => value === interval
    )?.title;

    return <>{displayName ?? "select..."}</>;
  }, [interval, intervalOptions]);

  return (
    <Section>
      <Title>알람간격</Title>
      <ReactSelect
        useMenuState={selectProps}
        options={intervalOptions.map(({ value, title: displayValue }) => {
          return {
            value,
            displayValue,
          };
        })}
        selected={selectedValue}
        onChanged={onClick}
      >
        {selectContents}
      </ReactSelect>
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
