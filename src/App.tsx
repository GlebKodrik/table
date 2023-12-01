import './global.scss';

import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';

import { SELECT_ITEMS } from '@/components/Table/components/control-table/constants';

import { Table } from './components/Table';
import { makeData } from './components/utils/makeData';

const columnHelper = createColumnHelper<any>();
const columns = [
  {
    accessorKey: 'firstName',
    id: 'firstName',
    header: 'Имя',
    cell: (info) => info.getValue(),
  },
  {
    id: 'lastName',
    header: 'few',
    columns: [
      {
        accessorKey: 'age',
        id: 'ag3e',
        header: 'Количество годов',
      },
    ],
  },
  {
    accessorKey: 'visits',
    id: 'visits',
    header: 'Визит',
    columns: [
      {
        accessorKey: 'status',
        id: 'status',
        header: 'Статус по жизни',
        footer: (props) => props.column.id,
      },
    ],
  },
];
const regenerateData = makeData(20);

function App() {
  const [perPage, setPerPage] = useState(SELECT_ITEMS[0]);
  const [page, setPage] = useState(0);
  const onPerPageChange = (value) => {
    setPerPage(value);
  };
  const onPaginationChange = (value) => {
    setPage(value);
  };

  return (
    <Table
      onPaginationChange={onPaginationChange}
      page={page}
      onPerPageChange={onPerPageChange}
      perPage={perPage}
      totalCount={200}
      isOneLineColumn
      columns={columns}
      data={regenerateData}
    />
  );
}

export default App;
