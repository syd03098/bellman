import { css, SimpleInterpolation } from "styled-components";

export const flexSpaceBetween = (): ReadonlyArray<SimpleInterpolation> => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default { flexSpaceBetween };
