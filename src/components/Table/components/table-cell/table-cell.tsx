import { IconArrowDown } from '@consta/icons/IconArrowDown';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import { Text } from '@consta/uikit/Text';
import { Cell, flexRender } from '@tanstack/react-table';
import cn from 'classnames';
import React from 'react';

import styles from './table-cell.module.scss';

type TTableBodyProps = { cell: Cell<any, unknown> };
export const NUMBER_LIST = ['number'];

export const getIsHaveType = (currentType: string, type: string) => {
  return type.toLowerCase().includes(currentType.toLowerCase());
};

const getIsNumber = (type: string) => {
  return Boolean(
    NUMBER_LIST.find((numberType) => getIsHaveType(numberType, type || '')),
  );
};
export const TableCell: React.FC<TTableBodyProps> = ({ cell }) => {
  const isGroup = cell.column.columnDef.meta?.isGroup;
  const dataType = cell.column.columnDef.meta?.dataType;
  const renderContent = () => {
    if (
      cell.getIsGrouped() ||
      (!cell.getIsGrouped() && isGroup && cell.row.getCanExpand())
    ) {
      return (
        <>
          <button
            className={styles.buttonCollapse}
            type="button"
            {...{
              cursor: cell.row.getCanExpand() ? 'pointer' : 'normal',
              onClick: cell.row.getToggleExpandedHandler(),
            }}
          >
            <div className={styles.wrapperContent}>
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
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </button>
        </>
      );
    }
    if (cell.getIsAggregated()) {
      return flexRender(
        cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
        cell.getContext(),
      );
    }
    if (cell.getIsPlaceholder()) {
      return null;
    }

    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };
  return (
    <div
      className={cn(styles.collapseWrapper, {
        [styles.align]: dataType && getIsNumber(dataType),
      })}
      style={{
        paddingLeft: isGroup ? `${cell.row.depth * 2}rem` : '',
      }}
    >
      <Text
        truncate
        size="s"
        lineHeight="s"
        title={cell.getValue() as string}
      >
        {renderContent()}
      </Text>
    </div>
  );
};
