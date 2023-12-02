import { Column } from '@tanstack/react-table';

import { TAddSortColumn } from '@/hooks/use-table/hooks/use-sort-for-table/types';

export type TProps = {
  columnName: string;
  column: Column<object, unknown>;
} & TColumnSortOptions;

export type TColumnSortOptions = {
  sortColumns: Record<string, TSortType>;
  changeSortColumn: (value: TAddSortColumn) => void;
};

export type TSortType = 'asc' | 'desc';
export type TColumnSort = {
  label: string;
  event: (arg?: any) => void;
  value: TSortType;
};
