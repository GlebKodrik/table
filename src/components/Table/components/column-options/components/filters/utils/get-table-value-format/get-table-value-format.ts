import { isNullOrUndefined } from 'utils/is-null-or-undefined';

import { TFormatValues } from '@/shared-components/table/components/table-content/types';

type TValue = string | boolean | number | null | undefined;
type TGetTableValueFormat = {
  value: TValue;
  formatValues?: (value: TFormatValues) => string;
  columnName?: string;
};
export const getTableValueFormat = ({
  value,
  formatValues,
  columnName,
}: TGetTableValueFormat): string => {
  if (isNullOrUndefined(value)) {
    return '';
  }

  if (formatValues && columnName) {
    return formatValues({ value, columnName });
  }

  switch (value) {
    case false: {
      return 'Нет';
    }
    case true: {
      return 'Да';
    }
    default: {
      return String(value);
    }
  }
};
