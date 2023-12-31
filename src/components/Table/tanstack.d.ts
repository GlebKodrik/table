import '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends any, TValue> {
    isGroup?: boolean;
    isHaveMenu?: boolean;
    collapseVisible?: string[];
    dataType?: 'number' | 'text';
  }
}
