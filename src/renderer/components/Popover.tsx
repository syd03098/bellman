import React, { cloneElement, ReactElement, RefAttributes } from "react";
import {
  Popover as ReakitPopover,
  PopoverArrow,
  PopoverDisclosure,
  PopoverOptions,
  PopoverProps,
  usePopoverState,
} from "reakit/Popover";
import styled from "styled-components";

export type PopOverProps = {
  disclosure: ReactElement & RefAttributes<HTMLButtonElement>;
} & Omit<PopoverProps, keyof PopoverOptions>;

const Popover = ({
  disclosure,
  children,
  ...restProps
}: PopOverProps): JSX.Element => {
  // todo: popover에서 usePopoverState를 갖게 하지 않도록 수정하기
  const props = usePopoverState({ placement: "bottom-end" });

  return (
    <>
      <PopoverDisclosure {...props} ref={disclosure.ref} {...disclosure.props}>
        {(disclosureProps) => cloneElement(disclosure, disclosureProps)}
      </PopoverDisclosure>
      <StyledPopover tabIndex={0} {...props} {...restProps}>
        <StyledPopoverArrow {...props} />
        {children}
      </StyledPopover>
    </>
  );
};

const StyledPopover = styled(ReakitPopover)`
  width: 90%;
  max-width: 320px;
  background-color: ${({ theme }) => theme.button.white};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border.white};
  padding: 8px;

  z-index: 100;
`;

const StyledPopoverArrow = styled(PopoverArrow)`
  svg {
    .stroke {
      fill: ${({ theme }) => theme.border.smoke};
    }
    .fill {
      fill: ${({ theme }) => theme.layout.subHeader};
    }
  }
`;

export default Popover;
