import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { MenuButton, MenuItem, Menu } from "reakit/Menu";
import {
  ReactSelectProps,
  SelectItemProps,
  Size,
} from "@components/select/types";
import DropdownIcon from "@icons/DropdownIcon";

const SelectItem = ({
  children,
  ...props
}: PropsWithChildren<SelectItemProps>): JSX.Element => {
  return <ReakitMenuItem {...props}>{children}</ReakitMenuItem>;
};

const getStyles = (size: Size) => {
  switch (size) {
    case "inline":
      return css`
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 96px;
      `;
    case "full":
      return css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      `;
    default:
      return css``;
  }
};

function ReactSelect<T extends string | number>({
  children,
  options,
  selected,
  onChanged,
  useMenuState: props,
  size = "inline",
  ...rest
}: ReactSelectProps<T>): JSX.Element {
  return (
    <>
      <StyledSelectButton size={size} {...props} {...rest}>
        <Message>{children}</Message>
        <IconWrap>
          <DropdownIcon />
        </IconWrap>
      </StyledSelectButton>
      <SelectMenu {...props} aria-label="options">
        {options.map(({ value, displayValue }) => (
          <SelectItem
            key={value}
            onClick={() => onChanged(value)}
            aria-checked={value === selected}
          >
            {displayValue}
          </SelectItem>
        ))}
      </SelectMenu>
    </>
  );
}

const StyledSelectButton = styled(MenuButton)<{ size: Size }>`
  ${({ size }) => getStyles(size)}

  background-color: ${({ theme }) => theme.button.white};
  border: 1px solid ${({ theme }) => theme.border.white};
  border-radius: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.text.plain};
  height: 36px;
`;

const SelectMenu = styled(Menu)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.button.white};
  border: 1px solid ${({ theme }) => theme.border.white};
  border-radius: 4px;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  padding-left: 3px;
  padding-right: 6px;
  color: ${({ theme }) => theme.text.plain};
`;

const ReakitMenuItem = styled(MenuItem)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.text.plain};

  &[aria-checked="true"] {
    background-color: ${({ theme }) => theme.button.primary};
    color: ${({ theme }) => theme.text.primary};
  }
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.text.plain};
`;

export default ReactSelect;
