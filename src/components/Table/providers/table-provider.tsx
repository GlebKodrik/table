import { createContext } from 'react';

import { TSelectItem } from '@/components/Table/components/control-table/constants';

export type TableProviderProps = {
  isOneLineColumn?: boolean;
  totalCount?: number;
  onPerPageChange?: (value: TSelectItem) => void;
  perPage?: TSelectItem;
  perPageItems?: TSelectItem[];
  page?: number;
  onPaginationChange?: (value: number) => void;
  isDisabledControlMenu?: boolean;
  isDragRow?: boolean;
};

export const TableProvider = createContext<TableProviderProps>({
  isOneLineColumn: false,
});
