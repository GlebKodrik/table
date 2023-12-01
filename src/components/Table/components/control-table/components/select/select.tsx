import { Select as ConstSelect } from '@consta/uikit/Select';
import React, { memo } from 'react';

import { TProps, TSelectItem } from './types';

export const Select = memo(
  ({ value, onChange, items, className, ...props }: TProps) => {
    const onSelectChange = (item: { value: TSelectItem | null }) => {
      if (item?.value) {
        onChange(item.value);
      }
    };

    return (
      <ConstSelect
        className={className}
        items={items}
        value={value}
        size="s"
        onChange={onSelectChange}
        {...props}
      />
    );
  },
);
