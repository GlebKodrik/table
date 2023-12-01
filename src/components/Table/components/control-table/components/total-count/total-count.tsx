import { Text } from '@consta/uikit/Text';
import cn from 'classnames';
import React, { memo } from 'react';

import styles from './total-count.module.scss';
import { TProps } from './types';

export const TotalCount = memo(
  ({ text = 'Всего элементов', totalCount = 0, className }: TProps) => {
    return (
      <div className={cn(styles.wrapper, className)}>
        <Text
          weight="semibold"
          size="m"
          lineHeight="m"
          view="primary"
          className={styles.title}
        >
          {text}:
        </Text>
        <Text
          weight="regular"
          size="m"
          lineHeight="m"
          view="secondary"
        >
          {totalCount ?? 0}
        </Text>
      </div>
    );
  },
);
