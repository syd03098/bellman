import styled, { css, SimpleInterpolation } from "styled-components";

export const flexSpaceBetween = (): ReadonlyArray<SimpleInterpolation> => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OptionTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.bold};
  margin: 0;
  user-select: none;
`;
