import { IconDraggable } from '@consta/icons/IconDraggable';
import { Cell, Row, Table } from '@tanstack/react-table';
import cn from 'classnames';
import React, { FC, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ID_DRAG_ROW } from '../../constants';
import { sumSizesBeforeId } from '../../utils/sum-sizes-before-id';
import { TableCell } from '../table-cell';
import styles from './draggable-row.module.scss';

export const DraggableRow: FC<{
  row: Row<any>;
  table: Table<any>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
}> = ({ row, reorderRow, table }) => {
  const leftColumn = useMemo(() => {
    return table.getLeftHeaderGroups()?.[0]?.headers;
  }, [table.getLeftHeaderGroups()]);

  const rightColumn = useMemo(() => {
    return table.getRightHeaderGroups()?.[0]?.headers.slice().reverse();
  }, [table.getRightHeaderGroups()]);

  const [{ isActive }, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<any>) => reorderRow(draggedRow.index, row.index),
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });

  const renderContent = (cell: Cell<any, unknown>) => {
    if (cell.column.id === ID_DRAG_ROW) {
      return (
        <div className={styles.dragRow}>
          <button
            type="button"
            ref={dragRef}
            className={styles.button}
          >
            <IconDraggable
              className={styles.draggableIcon}
              size="xs"
            />
          </button>
        </div>
      );
    }
    return <TableCell cell={cell} />;
  };

  return (
    <div
      className={cn('tr', { [styles.dropItem]: isActive })}
      ref={previewRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {row.getVisibleCells().map((cell) => {
        const isDragRow = cell.column.id === ID_DRAG_ROW;
        const isPinnedLeft = cell.column.getIsPinned() === 'left';
        const isPinnedRight = cell.column.getIsPinned() === 'right';

        return (
          <div
            ref={isDragRow ? dropRef : null}
            key={cell.id}
            style={{
              width: cell.column.getSize(),
              left: isPinnedLeft
                ? sumSizesBeforeId(leftColumn, cell.column.id)
                : undefined,
              right: isPinnedRight
                ? sumSizesBeforeId(rightColumn, cell.column.id)
                : undefined,
            }}
            className={cn('td', styles.td, {
              [styles.isOnly]: cell.row.original?.isOnly,
              [styles.sticky]: isPinnedLeft || isPinnedRight,
              [styles.stickyLeft]: isPinnedLeft,
              [styles.stickyRight]: isPinnedRight,
            })}
          >
            {renderContent(cell)}
          </div>
        );
      })}
    </div>
  );
};
