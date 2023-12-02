import './global.scss';

import { Tabs } from '@consta/uikit/Tabs';
import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';

import { SELECT_ITEMS } from '@/components/Table/components/control-table/constants';
import { NoDrag } from '@/no-drag';

import { Table } from './components/Table';
import { makeData } from './components/utils/makeData';

const columnHelper = createColumnHelper<any>();

const items: string[] = ['C Drag and Drop', 'Без Drag and drop'];
const regenerateData = makeData(100, 5, 3);
const getItemLabel = (label: string) => label;
function App() {
  const [value, setValue] = useState<string | null>(items[0]);
  const [perPage, setPerPage] = useState(SELECT_ITEMS[0]);
  const [page, setPage] = useState(0);
  const onPerPageChange = (value) => {
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
            totalCount={400}
            isOneLineColumn={false}
            columns={[
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
            ]}
            data={[...makeData(400)]}
          />
        </div>
      );
    }
    if (value === 'Без Drag and drop') {
      return <NoDrag />;
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
