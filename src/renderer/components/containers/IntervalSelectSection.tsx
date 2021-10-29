import React, { useCallback, useMemo } from "react";
import { useAppContext } from "@components/Context";
import { Nullable } from "@library/global";
import { useMenuState } from "reakit/Menu";
import { SelectOption } from "@components/select/types";
import { flexSpaceBetween } from "@library/styleFunctions";
import styled from "styled-components";
import ReactSelect from "@components/select";

interface Props {
  interval: Nullable<number>;
}

const IntervalSelectSection = ({ interval }: Props): JSX.Element => {
  const { setSettings, intervalOptions } = useAppContext();
  const selectProps = useMenuState({ placement: "bottom-end" });

  const options: SelectOption<number>[] = useMemo(
    () =>
      intervalOptions.map(({ title, value }) => {
        return {
          label: title,
          value,
        };
      }),
    [intervalOptions]
  );

  const selected = options.find((option) => option.value === interval);

  const onChange = useCallback(
    (option: SelectOption<number> | null) => {
      if (!option) {
        return;
      }

      setSettings((prev) => {
        return { ...prev, interval: Number(option.value) };
      });

      selectProps.hide();
    },
    [selectProps, setSettings]
  );

  return (
    <Section>
      <Title>알람간격</Title>
      <ReactSelect
        options={options}
        value={selected ?? null}
        onChange={onChange}
      />
    </Section>
  );
};

const Section = styled.section`
  ${flexSpaceBetween};

  padding-top: 8px;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.bold};
  margin: 0;
  user-select: none;
`;

export default IntervalSelectSection;
