export type TProps = {
  className?: string;
} & TPagination;

export type TPagination = {
  onChange: (value: number) => void;
  currentPage: number;
  totalPages: number;
  position?: 'center' | 'right' | 'left';
  isDisabled?: boolean;
};
