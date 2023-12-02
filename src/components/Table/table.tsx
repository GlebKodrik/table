import './table.scss';

import { cnMixCard } from '@consta/uikit/MixCard';
import { useComponentSize } from '@consta/uikit/useComponentSize';
import {
  ColumnDef,
  ColumnOrderState,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import cn from 'classnames';
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
  className?: string;
} & TableProviderProps;

const MIN_SIZE_COLUMN = 52;
export const Table: React.FC<TTableProps> = ({
  columns,
  data,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLTableSectionElement>(null);
  const { height } = useComponentSize(containerRef);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map((column) => column.id as string),
  );

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    state: {
      columnOrder,
      expanded,
    },
    onExpandedChange: setExpanded,
    onColumnOrderChange: setColumnOrder,
    getSubRows: (row) => (row as any).subRows,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: MIN_SIZE_COLUMN,
    },
  });

  return (
    <TableProvider.Provider value={props}>
      <div
        className={cnMixCard({ border: true, form: 'round' }, [
          className,
          styles.wrapperTable,
          styles.borderBottom,
        ])}
      >
        <div
          className={styles.additionalHeader}
          style={{
            height,
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
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className={cn(styles.td, {
                        [styles.isOnly]: cell.row.original.isOnly,
                      })}
                    >
                      <TableCell cell={cell} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ControlTable />
    </TableProvider.Provider>
  );
};
