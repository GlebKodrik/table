export type TSelectItem = {
  label: string;
  id: number;
  value: number | null;
};

export const SELECT_ITEMS: TSelectItem[] = [
  { id: 1, label: '50', value: 50 },
  { id: 2, label: '100', value: 100 },
  { id: 3, label: '200', value: 200 },
  { id: 4, label: '400', value: 400 },
  { id: 5, label: '800', value: 800 },
];
