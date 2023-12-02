import { Header } from '@tanstack/react-table';
import { createContext } from 'react';

export type HeaderProviderProps = {
  header?: Header<any, unknown>;
};

export const HeaderProvider = createContext<HeaderProviderProps>({});
