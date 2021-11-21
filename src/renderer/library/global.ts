import {
  DefaultTheme,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
} from "styled-components";

export type Nullable<T> = T | null;

export type CssPropsType =
  | FlattenSimpleInterpolation
  | FlattenInterpolation<ThemeProps<DefaultTheme>>;
