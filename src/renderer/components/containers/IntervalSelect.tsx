import React, { useCallback, useMemo } from "react";
import { flexSpaceBetween, OptionTitle } from "@library/styleFunctions";
import { useAppContext } from "@components/Context";
import { useMenuState } from "reakit/Menu";
import { SelectOption } from "@components/select/types";
import { css } from "styled-components";
import ReactSelect from "@components/select";

const IntervalSelect = (): JSX.Element => {
  const { setSettings, intervalOptions, interval } = useAppContext();
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
        return { ...prev, interval: option.value };
      });

      selectProps.hide();
    },
    [selectProps, setSettings]
  );

  return (
    <div
      css={css`
        ${flexSpaceBetween};
        padding-top: 8px;
        font-size: 14px;
      `}
    >
      <OptionTitle>알람간격</OptionTitle>
      <ReactSelect
        options={options}
        value={selected ?? null}
        onChange={onChange}
      />
    </div>
  );
};

export default IntervalSelect;
