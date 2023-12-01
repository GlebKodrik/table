import { Header } from '@tanstack/react-table';
import cn from 'classnames';
import React from 'react';

import styles from './column-resizer.module.scss';

type TColumnResizerProps = {
  header: Header<any, unknown>;
  isLastThead: boolean;
};

export const ColumnResizer: React.FC<TColumnResizerProps> = ({
  header,
  isLastThead,
}) => {
  return (
    <div
      onMouseDown={(event) => {
        header.getResizeHandler()(event);
      }}
      onTouchStart={header.getResizeHandler()}
      className={cn(styles.resizer, {
        [styles.lastThead]: isLastThead,
      })}
    />
  );
};
