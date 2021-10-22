import React, { PropsWithChildren, MouseEvent } from "react";
import Button from "@components/button";
import styled from "styled-components";
import DropdownIcon from "@icons/DropdownIcon";

type ReactSelectProps = {
  onSelect: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ReactSelect = ({
  onSelect,
  children,
}: PropsWithChildren<ReactSelectProps>): JSX.Element => {
  // todo: ReactSelect.tsx 에서 onSelect 를 정의하는게 좋을거같음, IntervalSelectSection이 너무 비대한듯
  return (
    <Button variant="white" size="md" onClick={onSelect}>
      <Message>{children}</Message>
      <IconWrap>
        <DropdownIcon />
      </IconWrap>
    </Button>
  );
};

const Message = styled.div`
  display: flex;
  align-items: center;
  padding-left: 3px;
  padding-right: 6px;
  color: ${({ theme }) => theme.text.plain};
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.text.plain};
`;

export default ReactSelect;
