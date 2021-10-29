import React, { forwardRef } from "react";
import {
  Input as ReakitInput,
  InputProps as ReakitInputProps,
} from "reakit/Input";
import styled from "styled-components";

const Input = forwardRef<HTMLInputElement, ReakitInputProps>((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

const StyledInput = styled(ReakitInput)`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.button.white};
  border: 1px solid ${({ theme }) => theme.border.smoke};
  color: ${({ theme }) => theme.text.plain};
  font-size: 14px;
  min-height: 32px;
  padding: 4px 8px;

  &:focus {
    border: 1px solid ${({ theme }) => theme.border.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.smoke};
  }
`;

export default Input;
