import { Checkbox } from '@consta/uikit/Checkbox';
import { Loader } from '@consta/uikit/Loader';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import React, { useEffect, useMemo } from 'react';

import { useTextFieldDebounce } from '@/components/Table/hooks/use-text-field-debounce';
import { getIsFoundValueInWord } from '@/components/Table/utils/get-is-found-value-in-word';
import { getTableValueFormat } from '@/components/Table/utils/get-table-value-format';

import styles from './filters.module.scss';
import { TFiltersProps } from './types';
import { getLabel } from './utils/get-label';

export const Filters: React.FC<TFiltersProps> = ({
  activeColumnFilters,
  columnFilters,
  columnName,
  changeFilterSelect,
  changeFilterSelectAll,
  requestGetDistinctFilters,
  isLoading = false,
  setIsAllSelected,
  column,
  formatValues,
}) => {
  const { meta } = column.columnDef;
  const currentDistinctFilters = columnFilters && columnFilters[columnName];
  const { onSearchFilterChange, searchValue, valueInput } =
    useTextFieldDebounce({});

  const filteredDistinctFilters = useMemo(() => {
    return currentDistinctFilters?.filter((filter) =>
      getIsFoundValueInWord(
        [
          getTableValueFormat({
            value: filter,
            formatValues,
            columnName,
          }),
        ],
        searchValue,
      ),
    );
  }, [searchValue, currentDistinctFilters]);

  const isIntermediate =
    activeColumnFilters &&
    activeColumnFilters?.length !== 0 &&
    activeColumnFilters?.length !== filteredDistinctFilters?.length;

  const isCheckedAll =
    activeColumnFilters &&
    activeColumnFilters?.length === filteredDistinctFilters?.length;

  useEffect(() => {
    if (requestGetDistinctFilters) {
      requestGetDistinctFilters({ columnName, meta });
    }
  }, []);

  const onChangeFilterSelect = (checked: boolean, label: string | number) => {
    changeFilterSelect({ checked, label, columnName, meta });
  };

  const onChangeFilterSelectAll = ({ checked }: { checked: boolean }) => {
    changeFilterSelectAll({ checked, columnName, meta });
    setIsAllSelected(checked);
  };

  const renderFilteredDistinctFilters = () => {
    if (isLoading) {
      return <Loader className={styles.loader} />;
    }
    if (!filteredDistinctFilters?.length) {
      return (
        <Text
          className={styles.empty}
          size="s"
        >
          Ничего нет
        </Text>
      );
    }

    return filteredDistinctFilters.map((label, index) => {
      return (
        <li
          key={index}
          className={styles.item}
        >
          <Checkbox
            size="m"
            className={styles.checkbox}
            label={getLabel({
              label,
              formatValues,
              columnName,
            })}
            checked={activeColumnFilters?.includes(label)}
            onChange={({ checked }) => {
              return onChangeFilterSelect(checked, label);
            }}
          />
        </li>
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperSearch}>
        <Checkbox
          onChange={onChangeFilterSelectAll}
          intermediate={isIntermediate}
          checked={isCheckedAll}
        />
        <TextField
          className={styles.search}
          size="s"
          placeholder="Поиск..."
          width="full"
          onChange={onSearchFilterChange}
          value={valueInput}
        />
      </div>
      <ul className={styles.list}>{renderFilteredDistinctFilters()}</ul>
    </div>
  );
};
