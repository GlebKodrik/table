import { IconArrowDown } from '@consta/icons/IconArrowDown';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import { Text } from '@consta/uikit/Text';
import { Cell, flexRender } from '@tanstack/react-table';
import React from 'react';

import styles from './table-cell.module.scss';

type TTableBodyProps = { cell: Cell<any, unknown> };

export const TableCell: React.FC<TTableBodyProps> = ({ cell }) => {
  const isGroup = cell.column.columnDef.meta?.isGroup;

  return (
    <div
      className={styles.collapseWrapper}
      style={{
        paddingLeft: isGroup ? `${cell.row.depth * 2}rem` : '',
      }}
    >
      {isGroup && cell.row.getCanExpand() ? (
        <button
          type="button"
          onClick={cell.row.getToggleExpandedHandler()}
          className={styles.buttonCollapse}
        >
          {cell.row.getIsExpanded() ? (
            <IconArrowDown
              size="s"
              className={styles.icon}
            />
          ) : (
            <IconArrowRight
              size="s"
              className={styles.icon}
            />
          )}
        </button>
      ) : null}
      <Text
        truncate
        size="s"
        lineHeight="s"
        title=""
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </Text>
    </div>
  );
};
