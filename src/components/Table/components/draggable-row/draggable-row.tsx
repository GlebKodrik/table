import { IconHamburger } from '@consta/uikit/IconHamburger';
import { Cell, Row } from '@tanstack/react-table';
import cn from 'classnames';
import React, { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ID_DRAG_ROF } from '../../constants';
import { TableCell } from '../table-cell';
import styles from './draggable-row.module.scss';

export const DraggableRow: FC<{
  row: Row<any>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
}> = ({ row, reorderRow }) => {
  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<any>) => reorderRow(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });

  const renderContent = (cell: Cell<any, unknown>) => {
    if (cell.column.id === ID_DRAG_ROF) {
      return (
        <div className={styles.dragRow}>
          <button
            type="button"
            ref={dragRef}
            className={styles.button}
          >
            <IconHamburger
              size="s"
              view="ghost"
            />
          </button>
        </div>
      );
    }
    return <TableCell cell={cell} />;
  };

  return (
    <div
      key={row.id}
      className="tr"
      ref={previewRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {row.getVisibleCells().map((cell) => (
        <div
          ref={cell.column.id === ID_DRAG_ROF ? dropRef : null}
          key={cell.id}
          style={{ width: cell.column.getSize() }}
          className={cn('td', styles.td, {
            [styles.isOnly]: cell.row.original?.isOnly,
          })}
        >
          {renderContent(cell)}
        </div>
      ))}
    </div>
  );
};
