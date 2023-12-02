import { TTableBodyValue } from '@/components/Table/components/column-options/components/filters/utils/get-label/get-label';
import { isNullOrUndefined } from '@/components/Table/components/column-options/components/filters/utils/is-null-or-undefined';

export type TFormatValues = {
  tableName?: string;
  value: TTableBodyValue;
  columnName?: string;
};

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
