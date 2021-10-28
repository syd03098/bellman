import {
  MenuButtonOptions,
  MenuButtonProps,
  MenuItemProps,
  MenuStateReturn,
  MenuItemOptions,
} from "reakit/Menu";
import { ReactNode } from "react";

export type Size = "full" | "inline";

interface Options<T extends string | number> {
  value: T;
  displayValue: string;
}

export type ReactSelectProps<T extends string | number> = {
  useMenuState: MenuStateReturn;
  options: Options<T>[];
  selected: T | undefined;
  size?: Size;
  onChanged: (value: T) => void;
  children: ReactNode;
} & Omit<MenuButtonProps, keyof MenuButtonOptions>;

export type SelectItemProps = Omit<MenuItemProps, keyof MenuItemOptions>;
