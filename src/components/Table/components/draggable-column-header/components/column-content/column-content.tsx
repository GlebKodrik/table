import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import { Text } from '@consta/uikit/Text';
import {
  flexRender,
  Header,
  Table,
  Updater,
  VisibilityState,
} from '@tanstack/react-table';
import cn from 'classnames';
import React, { useContext } from 'react';

import { TableProvider } from '@/components/Table/providers/table-provider';

import styles from './column-content.module.scss';

type TColumnContentProps = {
  header: Header<any, unknown>;
  table: Table<any>;
};

export const ColumnContent: React.FC<TColumnContentProps> = ({
  header,
  table,
}) => {
  const { isOneLineColumn } = useContext(TableProvider);
  const collapseVisible = header.column.columnDef.meta?.collapseVisible;

  const onHideColumn = () => {
    const newObj = { ...table.getState().columnVisibility };
    collapseVisible?.forEach((key) => {
      if (newObj.hasOwnProperty(key)) {
        newObj[key] = !newObj[key];
      } else {
        newObj[key] = false;
      }
    });
    table.setColumnVisibility(newObj as Updater<VisibilityState>);
  };

  const renderCollapseColumn = () => {
    if (header.isPlaceholder || !collapseVisible) {
      return;
    }

    const isHasTrue =
      Object.keys(table.getState().columnVisibility).length !== 0
        ? collapseVisible?.some((key) => {
            return table.getState().columnVisibility[key];
          })
        : undefined;

    if (typeof isHasTrue === 'undefined') {
      return (
        <button
          type="button"
          onClick={onHideColumn}
          className={cn(styles.button, styles.icon)}
        >
          <IconArrowRight size="s" />
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={onHideColumn}
        className={cn(styles.button, styles.icon)}
      >
        {isHasTrue ? <IconArrowRight size="s" /> : <IconArrowLeft size="s" />}
      </button>
    );
  };

  const headerContent = flexRender(
    header.column.columnDef.header,
    header.getContext(),
  );
  const title = typeof headerContent === 'string' ? headerContent : undefined;

  return (
    <div>
      <Text
        title={title}
        className={cn(styles.content, {
          [styles.oneLine]: !isOneLineColumn,
        })}
        truncate
        weight="semibold"
        size="xs"
        lineHeight="s"
      >
        {!header.isPlaceholder &&
          flexRender(header.column.columnDef.header, header.getContext())}
      </Text>
      {renderCollapseColumn()}
    </div>
  );
};
