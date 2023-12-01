export type TProps = {
  className?: string;
  disabled?: boolean;
} & TSelect;

export type TSelect = {
  items: TSelectItem[];
  value: TSelectItem;
  onChange: (value: TSelectItem) => void;
};

export type TSelectItem = {
  label: string;
  id: number;
  value: number | null;
};
