import { Column } from '@tanstack/react-table';

import { TUseActiveColumnsReturn } from '@/hooks/use-table/hooks/use-active-columns/types';
import { TResetFilters } from '@/hooks/use-table/hooks/use-filters/types';
import { TFormatValues } from '@/shared-components/table/components/table-content/types';

import { TColumnSortOptions } from './components/column-sort/types';
import { TFilters } from './components/filters/types';

export type TProps = {
  columnName: string;
  triggerClassName?: string;
  setOpenTrigger?: (isOpen: boolean) => void;
  optionsColumns: TColumnOptions;
  column: Column<object, unknown>;
  formatValues?: (value: TFormatValues) => string;
};

export type TColumnOptions = {
  resetFilters: (value: TResetFilters) => void;
  isDisabled?: boolean | undefined;
} & TFilters &
  TColumnSortOptions &
  Pick<TUseActiveColumnsReturn, 'activeColumns'>;
