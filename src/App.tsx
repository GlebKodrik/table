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
    header: 'First Name',
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
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Age',
    footer: (props) => props.column.id,
  },

  {
    accessorKey: 'visits',
    id: 'visits',
    header: 'Visits',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'progress',
    id: 'progress',
    header: 'Profile Progress',
    footer: (props) => props.column.id,
  },
];

const regenerateData = makeData(100, 5, 3);

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
    <div>
      <Table
        className="wrapper"
        onPaginationChange={onPaginationChange}
        page={page}
        onPerPageChange={onPerPageChange}
        perPage={perPage}
        totalCount={200}
        isOneLineColumn
        columns={columns}
        data={regenerateData}
      />
    </div>
  );
}

export default App;
