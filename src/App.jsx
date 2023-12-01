import { Table } from './components/Table';
import { makeData } from './components/utils/makeData';

const defaultColumns = [
  {
    accessorKey: 'firstName',
    id: 'firstName',
    header: 'Имя',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.lastName,
    id: 'lastName',
    cell: (info) => <>1111</>,
    header: 'few',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Количество годов',
  },

  {
    accessorKey: 'visits',
    id: 'visits',
    header: 'Визит',
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Статус по жизни',
    footer: (props) => props.column.id,
  },
];
const regenerateData = makeData(20);

function App() {
  return (
    <Table
      isOneLineColumn={false}
      columns={defaultColumns}
      data={regenerateData}
    />
  );
}

export default App;
