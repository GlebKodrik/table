import './global.scss';

import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';

import { SELECT_ITEMS } from '@/components/Table/components/control-table/constants';

import { Table } from './components/Table';
import { makeData } from './components/utils/makeData';

const columnHelper = createColumnHelper<any>();
const columns = [
  {
    header: 'Name',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: (props) => props.column.id,
          },
        ],
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
