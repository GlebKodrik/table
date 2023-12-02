import { IconCheck } from '@consta/uikit/IconCheck';
import { MenuItem } from '@szhsin/react-menu';
import { TableMeta } from '@tanstack/react-table';
import cn from 'classnames';
import React from 'react';

import globalStyles from '../../global-styles.module.scss';
import styles from './column-sort.module.scss';
import { TColumnSort, TProps, TSortType } from './types';

export const ColumnSort = ({
  columnName,
  sortColumns,
  changeSortColumn,
  column,
}: TProps) => {
  const sortColumnBy = (sortType: TSortType) => {
    changeSortColumn({
      sortType,
      columnName,
      meta: column.columnDef.meta as TableMeta<any>,
    });
  };
  const getIsActiveSort = (sortType: TSortType) => {
    if (sortColumns[columnName]) {
      return sortColumns[columnName] === sortType;
    }
    return false;
  };
  const renderActiveIcon = () => {
    return (
      <IconCheck
        size="xs"
        className={styles.activeIcon}
        view="success"
      />
    );
  };

  const COLUMN_SORT: TColumnSort[] = [
    {
      label: 'Сортировать по возрастанию',
      value: 'asc',
      event: () => sortColumnBy('asc'),
    },
    {
      label: 'Сортировать по убыванию',
      value: 'desc',
      event: () => sortColumnBy('desc'),
    },
  ];

  return (
    <>
      {COLUMN_SORT.map(({ label, event, value }) => (
        <MenuItem
          onClick={event}
          key={label}
          className={cn(getIsActiveSort(value), globalStyles.menuItem)}
        >
          {getIsActiveSort(value) && renderActiveIcon()}
          {label}
        </MenuItem>
      ))}
    </>
  );
};
