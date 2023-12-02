import styles from './freezing.module.scss';

const freezingItems = ['Слева', 'Справа', 'Открепить'];

export const Freezing = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {freezingItems.map((item, number) => (
          <li
            key={number}
            className={styles.item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
