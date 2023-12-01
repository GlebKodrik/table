import './table.scss';

import { cnMixCard } from '@consta/uikit/MixCard';
import { useComponentSize } from '@consta/uikit/useComponentSize';
import {
  ColumnDef,
  ColumnOrderState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DraggableColumnHeader } from 'components/Table/components/draggable-column-header';
import { TableCell } from 'components/Table/components/table-cell';
import React, { useRef } from 'react';

import { ControlTable } from '@/components/Table/components/control-table';
import {
  TableProvider,
  TableProviderProps,
} from '@/components/Table/providers/table-provider';

import styles from './table.module.scss';

type TTableProps = {
  columns: ColumnDef<unknown, any>[];
  data: any[];
} & TableProviderProps;

const MIN_SIZE_COLUMN = 52;
export const Table: React.FC<TTableProps> = ({ columns, data, ...props }) => {
  const containerRef = useRef<HTMLTableSectionElement>(null);
  const { height } = useComponentSize(containerRef);

  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map((column) => column.id as string),
  );

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: MIN_SIZE_COLUMN,
    },
  });

  return (
    <TableProvider.Provider value={props}>
      <div
        className={cnMixCard({ border: true, form: 'round' }, [
          styles.wrapperTable,
          styles.borderBottom,
        ])}
      >
        <div
          style={{
            height,
            background: 'rgb(0,113,178)',
            position: 'absolute',
            width: '100%',
            right: 0,
          }}
        />
        <table
          className={styles.table}
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead
            className={styles.thead}
            ref={containerRef}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <DraggableColumnHeader
                    key={header.id}
                    header={header}
                    table={table}
                  />
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className={styles.td}
                  >
                    <TableCell cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ControlTable />
    </TableProvider.Provider>
  );
};
