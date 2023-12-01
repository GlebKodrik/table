import { Text } from '@consta/uikit/Text';
import cn from 'classnames';
import React, { memo, useContext } from 'react';

import { TableProvider } from '@/components/Table/providers/table-provider';

import { Pagination } from './components/pagination';
import { Select } from './components/select';
import { TotalCount } from './components/total-count';
import { SELECT_ITEMS } from './constants';
import styles from './control-table.module.scss';

export const ControlTable = memo(() => {
  const {
    perPage: propPerPage,
    onPerPageChange,
    perPageItems = SELECT_ITEMS,
    totalCount,
    page = 0,
    isDisabledControlMenu,
    onPaginationChange,
  } = useContext(TableProvider);
  const perPage = propPerPage || perPageItems[0];

  const isHaveSelect = perPage && onPerPageChange && perPageItems;
  const isHavePagination = Number.isFinite(page) && onPaginationChange;

  const totalPages = perPage?.value
    ? Math.ceil((totalCount || 0) / (perPage.value || 0))
    : null;

  if (!isHaveSelect && !isHavePagination && !totalCount) {
    return null;
  }

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.wrapperWithSelect]: perPage || (totalPages && totalPages <= 1),
        [styles.lastElement]: !isHavePagination && !isHaveSelect,
      })}
    >
      {isHaveSelect ? (
        <div className={styles.wrapperSelect}>
          <>
            <Text>Показывать&nbsp;строк</Text>
            <div className={styles.select}>
              <Select
                className={cn({
                  [styles.disabledSelect]: isDisabledControlMenu,
                })}
                disabled={isDisabledControlMenu}
                items={perPageItems}
                onChange={onPerPageChange}
                value={perPage}
              />
            </div>
          </>
        </div>
      ) : null}
      {isHavePagination ? (
        <Pagination
          currentPage={page as number}
          totalPages={totalPages || 0}
          onChange={onPaginationChange}
          position="center"
          isDisabled={isDisabledControlMenu}
          className={styles.pagination}
        />
      ) : null}
      {totalCount ? (
        <TotalCount
          text="Всего элементов"
          totalCount={totalCount}
          className={styles.totalCount}
        />
      ) : null}
    </div>
  );
});
