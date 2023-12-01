import { Pagination as ConstPagination } from '@consta/uikit/Pagination';
import cn from 'classnames';
import React, { memo } from 'react';

import styles from './pagination.module.scss';
import { TProps } from './types';

export const Pagination = memo(
  ({
    className,
    onChange,
    currentPage,
    totalPages,
    position,
    isDisabled = false,
  }: TProps) => {
    const hotKeys = {
      prevPage: {
        label: '',
        values: ['Shift', 'ArrowLeft'],
      },
      nextPage: {
        label: '',
        values: ['Shift', 'ArrowRight'],
      },
    };
    return (
      <ConstPagination
        form="default"
        currentPage={currentPage}
        onChange={onChange}
        totalPages={totalPages}
        hotkeys={hotKeys}
        size="s"
        className={cn(className, {
          [styles.disabled]: isDisabled,
        })}
        position={position}
      />
    );
  },
);
