export const sumSizesBeforeId = (
  array: { column: { id: string }; getSize: () => number }[],
  targetId: string,
) => {
  const targetIndex = array.findIndex((item) => item?.column?.id === targetId);
  if (targetIndex <= 0) return 0;
  return array
    .slice(0, targetIndex)
    .reduce((acc, item) => acc + (item?.getSize() || 0), 0);
};
