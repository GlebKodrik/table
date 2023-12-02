import { Column } from '@tanstack/react-table';

import {
  TChangeFilterSelect,
  TChangeFilterSelectAll,
} from '@/hooks/use-table/hooks/use-filters/types';
import { TFormatValues } from '@/shared-components/table/components/table-content/types';
import { TDistinctFilters } from '@/types/global-types';

export type TFiltersProps = {
  columnName: string;
  activeColumnFilters: (string | number)[];
  column: Column<object, unknown>;
  isAllSelected: boolean;
  setIsAllSelected: (value: boolean) => void;
} & Omit<TFilters, 'activeColumnFilters'>;

export type TFilters = {
  requestGetDistinctFilters: (value: TDistinctFilters) => void;
  changeFilterSelect: (value: TChangeFilterSelect) => void;
  changeFilterSelectAll: (value: TChangeFilterSelectAll) => void;
  activeColumnFilters: Record<string, string[]>;
  columnFilters: Record<string, (string | number)[]>;
  isLoading?: boolean;
  formatValues?: (value: TFormatValues) => string;
};
