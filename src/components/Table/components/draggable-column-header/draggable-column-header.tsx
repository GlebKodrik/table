import { Column, ColumnOrderState, Header, Table } from '@tanstack/react-table';
import { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ColumnContent } from '@/components/Table/components/draggable-column-header/components/column-content';
import { ColumnResizer } from '@/components/Table/components/draggable-column-header/components/column-resizer';

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
  const isLastThead = header.index === header.headerGroup.headers.length - 1;

  return (
    <th
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
      className={styles.column}
    >
      <div
        ref={(ref) => {
          dragRef(ref);
        }}
      >
        <ColumnContent header={header} />
      </div>
      <ColumnResizer
        header={header}
        isLastThead={isLastThead}
      />
    </th>
  );
};
