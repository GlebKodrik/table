import { createColumnHelper } from '@tanstack/react-table';

import { Table } from './components/Table';
import { makeData } from './components/utils/makeData';

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.group({
    id: 'hello',
    header: 'Привет',
    // footer: props => props.column.id,
  }),
  columnHelper.group({
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor('age', {
        header: 'Age',
      }),
      columnHelper.group({
        header: 'More Info',
        columns: [
          columnHelper.accessor('visits', {
            header: 'Visits',
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor('status', {
            header: 'Status',
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor('progress', {
            header: 'Profile Progress',
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
  }),
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
