import { TSelectItem } from '../select/types';

export type TControlTable = Partial<{
  isDisabled: boolean;
  text: string;
  selectItems: TSelectItem[];
  position: 'center' | 'right' | 'left';
  totalCount: number;
  onPaginationChange: (page: number) => void;
  selectChange: (select: TSelectItem) => void;
  totalPages: number;
  currentPage: number;
  className: string;
  selectValue: TSelectItem;
}>;
export type TProps = TControlTable;
