export const getIsFoundValueInWord = (
  values: string[],
  searchValue: string,
): boolean => {
  return values.some((value) => {
    return String(value)
      .toLowerCase()
      .trim()
      .includes((searchValue?.trim() || '').toLowerCase() as string);
  });
};
