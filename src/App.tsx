import './global.scss';

import { Tabs } from '@consta/uikit/Tabs';
import { useState } from 'react';

import { SELECT_ITEMS } from '@/components/Table/components/control-table/constants';
import { NoDrag } from '@/no-drag';

import { Table } from './components/Table';
import { makeData } from './components/utils/makeData';

const columns = [
  {
    accessorKey: 'firstName',
    id: 'firstName',
    header: 'Первое имя',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.lastName,
    id: 'Фамилия',
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'age',
    id: 'Количество лет',
    header: 'Age',
    footer: (props) => props.column.id,
    meta: {
      dataType: 'number',
    },
  },

  {
    accessorKey: 'visits',
    id: 'visits',
    header: 'Визит',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Статус',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'progress',
    id: 'Прогресс',
    header: 'Profile Progress',
    footer: (props) => props.column.id,
  },
];

const items: string[] = ['C Drag and Drop', 'Без Drag and drop'];
const regenerateData = makeData(100, 5, 3);
const getItemLabel = (label: string) => label;
function App() {
  const [tableData, setTableData] = useState(() => makeData(50));
  const [value, setValue] = useState<string | null>(items[0]);
  const [perPage, setPerPage] = useState(SELECT_ITEMS[0]);
  const [page, setPage] = useState(0);
  const onPerPageChange = (value) => {
    setTableData(() => makeData(value.value));
    setPerPage(value);
  };
  const onPaginationChange = (value) => {
    setPage(value);
  };

  const renderTable = () => {
    if (value === 'C Drag and Drop') {
      return (
        <div>
          <Table
            className="wrapper"
            onPaginationChange={onPaginationChange}
            page={page}
            onPerPageChange={onPerPageChange}
            perPage={perPage}
            totalCount={tableData?.length}
            isOneLineColumn={false}
            columns={columns}
            data={tableData}
          />
        </div>
      );
    }
    if (value === 'Без Drag and drop') {
      return <NoDrag />;
    }
    if (value === 'Без данных') {
      return (
        <Table
          className="wrapper"
          onPaginationChange={onPaginationChange}
          page={page}
          onPerPageChange={onPerPageChange}
          perPage={perPage}
          totalCount={tableData?.length}
          columns={columns}
          data={[]}
        />
      );
    }
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={getItemLabel}
        style={{
          marginBottom: 16,
        }}
      />
      {renderTable()}
    </>
  );
}

export default App;
