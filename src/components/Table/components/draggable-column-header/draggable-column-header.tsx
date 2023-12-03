import { Column, ColumnOrderState, Header, Table } from '@tanstack/react-table';
import cn from 'classnames';
import { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ColumnOptions } from '@/components/Table/components/column-options';
import { ColumnContent } from '@/components/Table/components/draggable-column-header/components/column-content';
import { ColumnResizer } from '@/components/Table/components/draggable-column-header/components/column-resizer';
import { HeaderProvider } from '@/components/Table/components/draggable-column-header/providers/header-provider';
import { ID_DRAG_ROW } from '@/components/Table/constants';

import styles from './components/column-content/column-content.module.scss';

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[],
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string,
  );
  return [...columnOrder];
};

export const DraggableColumnHeader: FC<{
  header: Header<any, unknown>;
  table: Table<any>;
}> = ({ header, table }) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: Column<any>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder,
      );
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  });
  const isHaveMenu = header.column.columnDef.meta?.isHaveMenu;

  const isShowMenu = !header.subHeaders?.length && isHaveMenu !== false;
  const isLastThead = header.index === header.headerGroup.headers.length - 1;
  const columnAccessorKey = (header.column.columnDef as { accessorKey: string })
    .accessorKey;

  return (
    <div
      {...{
        key: header.id,
        colSpan: header.colSpan,
        style: {
          width: header.getSize(),
          opacity: isDragging ? 0.5 : 1,
        },
      }}
      ref={(ref) => {
        dropRef(ref);
        previewRef(ref);
      }}
      className={cn('th', {
        [styles.sticky]: header.id === ID_DRAG_ROW,
      })}
    >
      <HeaderProvider.Provider value={{ header }}>
        <div className={styles.column}>
          <div
            ref={(ref) => {
              dragRef(ref);
            }}
          >
            <ColumnContent
              header={header}
              table={table}
            />
          </div>
          {isShowMenu ? (
            <ColumnOptions
              header={header}
              triggerClassName={cn(styles.trigger, {
                [styles.lastColumnOptions]: isLastThead,
              })}
              columnName={columnAccessorKey}
              // @ts-ignore
              optionsColumns={{
                activeColumnFilters: {},
                columnFilters: {},
                activeColumns: {},
                sortColumns: {},
              }}
              column={column}
              formatValues={() => 'Привет'}
            />
          ) : null}
          <ColumnResizer
            header={header}
            isLastThead={isLastThead}
          />
        </div>
      </HeaderProvider.Provider>
    </div>
  );
};
