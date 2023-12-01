import { createContext } from 'react';

export type TableProviderProps = {
  isSingleLineColumnText?: boolean;
};

export const TableProvider = createContext<TableProviderProps>({
  isSingleLineColumnText: true,
});
