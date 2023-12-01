import { Text } from '@consta/uikit/Text';
import { flexRender, Header } from '@tanstack/react-table';
import cn from 'classnames';
import React, { useContext } from 'react';

import { TableProvider } from '@/components/Table/providers/table-provider';

import styles from './column-content.module.scss';

type TColumnContentProps = {
  header: Header<any, unknown>;
};

export const ColumnContent: React.FC<TColumnContentProps> = ({ header }) => {
  const title =
    typeof header.column.columnDef.header === 'string'
      ? header.column.columnDef.header
      : undefined;

  const { isOneLineColumn } = useContext(TableProvider);
  return (
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
  );
};
