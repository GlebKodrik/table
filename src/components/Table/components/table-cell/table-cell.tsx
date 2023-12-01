import { Text } from '@consta/uikit/Text';
import { Cell, flexRender } from '@tanstack/react-table';
import React from 'react';

type TTableBodyProps = { cell: Cell<any, unknown> };

export const TableCell: React.FC<TTableBodyProps> = ({ cell }) => {
  return (
    <Text
      truncate
      size="s"
      lineHeight="s"
      title=""
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Text>
  );
};
