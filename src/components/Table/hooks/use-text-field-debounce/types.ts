export type TUseTextFieldDebounce = {
  defaultSearchValue?: string;
  time?: number;
};

export type TUseTextFieldDebounceReturn = {
  onSearchFilterChange: ({ value }: { value: string }) => void;
  searchValue: string;
  valueInput: string;
};
