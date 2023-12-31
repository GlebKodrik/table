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
    meta: {
      dataType: 'number',
    },
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
  {
    accessorKey: 'test1',
    id: 'test1',
    header: 'Визит',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'test2',
    id: 'tes2',
    header: 'Статус',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'test3',
    id: 'test3',
    header: 'Profile Progress',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'test4',
    id: 'test4',
    size: 300,
    header: 'Визит',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'test5',
    id: 'test5',
    size: 300,
    header: 'Статус',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'test6',
    id: 'test6',
    size: 300,
    header: 'Profile Progress',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'test7',
    id: 'test7',
    size: 300,
    header: 'Визит',
    footer: (props) => props.column.id,
  },
];

const items: string[] = [
  'C Drag and Drop (и drag and drop строк)',
  'Без Drag and drop',
];
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
    if (value === 'C Drag and Drop (и drag and drop строк)') {
      return (
        <div className="test">
          <Table
            className="wrapper"
            isDragRow
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
