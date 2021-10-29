export type SelectOption<T extends string | number> = {
  label: string;
  value: T;
};

export interface ReactSelectProps<T extends string | number> {
  options: SelectOption<T>[];
  value: SelectOption<T> | null;
  onChange: (option: SelectOption<T>) => void;
}
