import './styles.scss';

import { IconArrowRight } from '@consta/uikit/IconArrowRight';
import { IconFunnel } from '@consta/uikit/IconFunnel';
import { IconHamburger } from '@consta/uikit/IconHamburger';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuProps,
  SubMenu,
} from '@szhsin/react-menu';
import cn from 'classnames';
import React, { useState } from 'react';

import styles from './column-options.module.scss';
import { ColumnSort } from './components/column-sort';
import { Filters } from './components/filters';
import { Freezing } from './components/freezing/freezing';
import { Separator } from './components/separator/separator';
import globalStyled from './global-styles.module.scss';
import { TProps } from './types';

const SUBMENU_OPEN_DELAY = 500;
export const ColumnOptions = ({
  triggerClassName,
  columnName,
  optionsColumns,
  column,
  formatValues,
}: TProps) => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const {
    requestGetDistinctFilters,
    changeFilterSelect,
    activeColumnFilters,
    columnFilters,
    changeFilterSelectAll,
    isLoading,
    activeColumns,
  } = optionsColumns;

  const activeFilters = activeColumnFilters && activeColumnFilters[columnName];
  const isActiveFilters = activeColumns[columnName]?.filter;
  const isActiveSorting = activeColumns[columnName]?.sortBy;

  const renderFilterMenu = () => {
    return (
      <MenuButton
        className={cn(styles.iconButton, {
          [styles.isActiveMenu]: isActiveFilters,
        })}
      >
        <IconFunnel
          size="xs"
          view="primary"
        />
      </MenuButton>
    );
  };

  const renderHamburgerMenu = () => {
    return (
      <MenuButton
        className={cn(styles.iconButton, {
          [styles.isActiveMenu]: isActiveSorting,
        })}
      >
        <IconHamburger
          size="xs"
          view="primary"
        />
      </MenuButton>
    );
  };

  const onItemClick: MenuProps['onItemClick'] = (event) => {
    event.keepOpen = true;
  };

  return (
    <div className={cn(styles.menuContainer, triggerClassName)}>
      <Menu
        onItemClick={onItemClick}
        gap={4}
        menuButton={renderFilterMenu()}
        menuClassName={styles.menu}
        submenuOpenDelay={SUBMENU_OPEN_DELAY}
      >
        <MenuItem>
          <Filters
            isLoading={isLoading}
            requestGetDistinctFilters={requestGetDistinctFilters}
            activeColumnFilters={activeFilters}
            columnFilters={columnFilters}
            changeFilterSelectAll={changeFilterSelectAll}
            changeFilterSelect={changeFilterSelect}
            columnName={columnName}
            column={column}
            isAllSelected={isAllSelected}
            setIsAllSelected={setIsAllSelected}
            formatValues={formatValues}
          />
        </MenuItem>
      </Menu>

      <Menu
        gap={4}
        onItemClick={onItemClick}
        menuButton={renderHamburgerMenu()}
        menuClassName={styles.menu}
        submenuOpenDelay={SUBMENU_OPEN_DELAY}
      >
        <ColumnSort
          column={column}
          columnName={columnName}
          {...optionsColumns}
        />
        <Separator />
        <MenuItem className={globalStyled.menuItem}>
          Сгруппировать по столбцу
        </MenuItem>
        <Separator />
        <SubMenu
          menuClassName={styles.menu}
          label={
            <div className={globalStyled.menuItem}>
              <div className={styles.filters}>Закрепить столбец</div>
              <IconArrowRight
                className={styles.icon}
                size="s"
              />
            </div>
          }
        >
          <MenuItem>
            <Freezing />
          </MenuItem>
        </SubMenu>
        <MenuItem className={globalStyled.menuItem}>
          Сброс настроек столбца
        </MenuItem>
      </Menu>
    </div>
  );
};