import { render } from '@testing-library/react';

import { ControlTable } from './control-table';

describe('Component ControlTable', () => {
  test('ControlTable render without parameters', () => {
    const { asFragment } = render(<ControlTable />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('ControlTable children render with parameters', () => {
    const { asFragment } = render(
      <ControlTable
        selectChange={() => {}}
        onPaginationChange={() => {}}
        totalCount={0}
        selectItems={[
          { label: '20', value: 20, id: 1 },
          { label: '30', value: 40, id: 2 },
          { label: '60', value: 60, id: 2 },
        ]}
        selectValue={{ label: '30', value: 40, id: 2 }}
        totalPages={1000}
        currentPage={6}
        text="Всего количество"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('ControlTable render with only totalCount', () => {
    const { asFragment } = render(
      <ControlTable
        totalCount={0}
        text="Всего количество"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('ControlTable render with only pagination', () => {
    const { asFragment } = render(
      <ControlTable
        totalPages={1000}
        currentPage={6}
        onPaginationChange={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('ControlTable render with only select', () => {
    const { asFragment } = render(
      <ControlTable
        selectItems={[
          { label: '20', value: 20, id: 1 },
          { label: '30', value: 40, id: 2 },
          { label: '60', value: 60, id: 2 },
        ]}
        selectValue={{ label: '30', value: 40, id: 2 }}
        selectChange={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('ControlTable render with select and totalCount', () => {
    const { asFragment } = render(
      <ControlTable
        selectItems={[
          { label: '20', value: 20, id: 1 },
          { label: '30', value: 40, id: 2 },
          { label: '60', value: 60, id: 2 },
        ]}
        selectValue={{ label: '30', value: 40, id: 2 }}
        totalCount={0}
        text="Всего количество"
        selectChange={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('ControlTable render with pagination and totalCount', () => {
    const { asFragment } = render(
      <ControlTable
        totalPages={1000}
        currentPage={6}
        totalCount={0}
        text="Всего количество"
        onPaginationChange={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('ControlTable render with isDisabled', () => {
    const { asFragment } = render(
      <ControlTable
        selectItems={[
          { label: '20', value: 20, id: 1 },
          { label: '30', value: 40, id: 2 },
          { label: '60', value: 60, id: 2 },
        ]}
        selectChange={() => {}}
        selectValue={{ label: '30', value: 40, id: 2 }}
        totalPages={1000}
        currentPage={6}
        totalCount={0}
        text="Всего количество"
        onPaginationChange={() => {}}
        isDisabled
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('ControlTable render with pagination zero page', () => {
    const { asFragment } = render(
      <ControlTable
        onPaginationChange={() => {}}
        totalPages={1000}
        currentPage={0}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
