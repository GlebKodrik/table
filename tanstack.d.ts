import '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends any, TValue> {
    isGroup?: boolean;
    collapseVisible?: string[];
  }
}
