import React, { useCallback } from "react";
import { ReactSelectProps, SelectOption } from "@components/select/types";
import Select from "react-select";
import styled from "styled-components";

function ReactSelect<T extends string | number>({
  options,
  value,
  disabled = false,
  onChange: onChangeHandler,
}: ReactSelectProps<T>): JSX.Element {
  const onChange = useCallback(
    (option: SelectOption<T> | null) => {
      if (!option) {
        return;
      }
      onChangeHandler(option);
    },
    [onChangeHandler]
  );

  return (
    <SelectContainer>
      <Select
        classNamePrefix="react_select"
        isSearchable={false}
        isClearable={false}
        isDisabled={disabled}
        options={options}
        value={value}
        onChange={onChange}
      />
    </SelectContainer>
  );
}

const SelectContainer = styled.div`
  .react_select__control {
    background-color: ${({ theme }) => theme.button.white};
    color: ${({ theme }) => theme.text.plain};
    border: 1px solid ${({ theme }) => theme.border.white};
    min-height: 32px;

    .react_select__value-container {
      line-height: normal;
    }
  }

  .react_select__indicator {
    padding: 4px;
  }
  .react_select__indicator-separator {
    display: none;
  }

  .form__select__menu {
    background-color: ${({ theme }) => theme.button.white};
    color: ${({ theme }) => theme.text.plain};
  }
`;

export default ReactSelect;
