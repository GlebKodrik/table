import { useDebounce } from '@consta/uikit/useDebounce';
import { useEffect, useState } from 'react';

import { TUseTextFieldDebounce, TUseTextFieldDebounceReturn } from './types';

export const useTextFieldDebounce = ({
  defaultSearchValue = '',
  time = 300,
}: TUseTextFieldDebounce): TUseTextFieldDebounceReturn => {
  const [valueInput, setValueInput] = useState(defaultSearchValue);
  const [searchValue, setSearchValue] = useState(defaultSearchValue);
  const debounceSetSearchValue = useDebounce(setSearchValue, time);
  useEffect(() => debounceSetSearchValue(valueInput), [valueInput]);
  const onSearchFilterChange = ({ value }: { value: string }) => {
    setValueInput(value);
  };

  return {
    onSearchFilterChange,
    searchValue,
    valueInput,
  };
};
