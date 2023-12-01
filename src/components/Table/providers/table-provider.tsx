import { createContext } from 'react';

export type TableProviderProps = {
  isOneLineColumn?: boolean;
};

export const TableProvider = createContext<TableProviderProps>({
  isOneLineColumn: false,
});
