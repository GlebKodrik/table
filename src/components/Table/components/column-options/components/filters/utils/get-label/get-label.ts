import { isNullOrUndefined } from '@/components/Table/components/column-options/components/filters/utils/is-null-or-undefined';
import { getTableValueFormat } from '@/components/Table/utils/get-table-value-format';

export type TFormatValues = {
  tableName?: string;
  value: TTableBodyValue;
  columnName?: string;
};

export type TTableBodyValue = boolean | string | number | undefined | null;

export const EMPTY_LABEL = '(Пустые)';

type TGetLabel = {
  label: TTableBodyValue;
  formatValues?: (value: TFormatValues) => string;
  columnName?: string;
};
export const getLabel = ({
  label,
  formatValues,
  columnName,
}: TGetLabel): string => {
  if (isNullOrUndefined(label)) {
    return EMPTY_LABEL;
  }

  return getTableValueFormat({ value: label, formatValues, columnName });
};
