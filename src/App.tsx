import { createColumnHelper } from '@tanstack/react-table';

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
  return (
    <Table
      onPaginationChange={() => {}}
      page={0}
      onPerPageChange={() => {}}
      totalCount={200}
      isOneLineColumn={false}
      columns={columns}
      data={regenerateData}
    />
  );
}

export default App;
