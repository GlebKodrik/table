import { IconCheck } from '@consta/uikit/IconCheck';
import { useContext } from 'react';

import { HeaderProvider } from '@/components/Table/components/draggable-column-header/providers/header-provider';

import styles from './freezing.module.scss';

export const Freezing = () => {
  const { header } = useContext(HeaderProvider);
  const freezingItems = [
    { name: 'Слева', onClick: () => header?.column.pin('left'), value: 'left' },
    {
      name: 'Справа',
      onClick: () => header?.column.pin('right'),
      value: 'right',
    },
    { name: 'Открепить', onClick: () => header?.column.pin(false) },
  ];

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {freezingItems.map((item, number) => (
          <li
            onKeyDown={item.onClick}
            onClick={item.onClick}
            key={number}
            className={styles.item}
          >
            {header?.column.getIsPinned() === item.value ? (
              <IconCheck
                className={styles.icon}
                size="s"
                view="success"
              />
            ) : null}
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
