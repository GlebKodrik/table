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

const MIN_SIZE_COLUMN = 65;
export const Table: React.FC<TTableProps> = ({
  columns,
  data,
  className,
  ...props
}) => {
  const [columnPinning, setColumnPinning] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
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
    enableColumnResizing: true,
    enableHiding: true,
    state: {
      columnOrder,
      expanded,
      columnVisibility,
      columnPinning,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
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
        <div
          className={cn('divTable', styles.table)}
          {...{
            style: {
              width: table.getTotalSize(),
            },
          }}
        >
          <div
            className={cn('thead', styles.thead)}
            ref={containerRef}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <div
                key={headerGroup.id}
                className="tr"
              >
                {headerGroup.headers.map((header) => (
                  <DraggableColumnHeader
                    key={header.id}
                    header={header}
                    table={table}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="tbody">
            {table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className="tr"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <div
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className={cn('td', styles.td, {
                        [styles.isOnly]: cell.row.original?.isOnly,
                      })}
                    >
                      <TableCell cell={cell} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ControlTable />
    </TableProvider.Provider>
  );
};
