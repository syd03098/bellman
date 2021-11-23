import React, { ButtonHTMLAttributes, memo, PropsWithChildren } from "react";
import styled from "styled-components";

export type ItemProps = {
  emoji?: string;
} & PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const Item = ({ emoji, children, ...props }: ItemProps): JSX.Element => {
  return (
    <StyledItem {...props}>
      <Emoji>{emoji ?? "🤔"}</Emoji>
      <Divider />
      <Right>{children}</Right>
    </StyledItem>
  );
};

const StyledItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 8px;
  background-color: ${({ theme }) => theme.button.white};
  border: 1px solid ${({ theme }) => theme.border.white};
  border-radius: 4px;
  color: ${({ theme }) => theme.text.plain};
  user-select: none;

  &:disabled {
    cursor: default;
  }
`;

const Emoji = styled.div`
  flex: 0 0 auto;
  padding-right: 8px;
`;

const Divider = styled.div`
  background-color: ${({ theme }) => theme.border.white};
  height: 100%;
  width: 1px;
  margin-right: 8px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1 1 auto;
`;

export default memo(Item);
