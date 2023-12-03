import './table.scss';

import { cnMixCard } from '@consta/uikit/MixCard';
import { useComponentSize } from '@consta/uikit/useComponentSize';
import {
  ColumnDef,
  ColumnOrderState,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  GroupingState,
  useReactTable,
} from '@tanstack/react-table';
import cn from 'classnames';
import React, { useMemo, useRef } from 'react';

import { ControlTable } from '@/components/Table/components/control-table';
import {
  TableProvider,
  TableProviderProps,
} from '@/components/Table/providers/table-provider';

import { DraggableColumnHeader } from './components/draggable-column-header';
import { DraggableRow } from './components/draggable-row';
import { ID_DRAG_ROF } from './constants';
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
  const tableColumns = useMemo(() => {
    return props.isDragRow
      ? [
          {
            size: MIN_SIZE_COLUMN,
            id: ID_DRAG_ROF,
            header: '',
            meta: {
              isHaveMenu: false,
            },
          },
          ...columns,
        ]
      : columns;
  }, [columns, props.isDragRow]);
  const [grouping, setGrouping] = React.useState<GroupingState>([]);
  const [columnPinning, setColumnPinning] = React.useState(
    props.isDragRow ? { left: [ID_DRAG_ROF] } : {},
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const containerRef = useRef<HTMLTableSectionElement>(null);
  const { height } = useComponentSize(containerRef);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    tableColumns.map((column) => column.id as string),
  );
  const [tableData, setTableData] = React.useState(data);
  console.log(columnPinning);
  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    enableHiding: true,
    state: {
      columnOrder,
      expanded,
      columnVisibility,
      columnPinning,
      grouping,
    },
    onGroupingChange: setGrouping,
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    getGroupedRowModel: getGroupedRowModel(),
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    getSubRows: (row) => (row as any).subRows,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: MIN_SIZE_COLUMN,
    },
  });

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0] as any);
    setTableData([...data]);
  };

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
              <DraggableRow
                row={row}
                reorderRow={reorderRow}
              />
            ))}
          </div>
        </div>
      </div>
      <ControlTable />
    </TableProvider.Provider>
  );
};
