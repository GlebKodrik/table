import './global.scss';

import { Badge } from '@consta/uikit/Badge';
import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';

import { SELECT_ITEMS } from '@/components/Table/components/control-table/constants';

import { Table } from './components/Table';
import { makeData } from './components/utils/makeData';

const columnHelper = createColumnHelper<any>();
const columns = [
  {
    header: 'Имя',
    columns: [
      {
        accessorKey: 'firstName',
        meta: {
          isGroup: true,
        },
        size: 300,
        header: ({ table }) => (
          <>
            <button
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
            >
              {table.getIsAllRowsExpanded() ? '👇' : '👉'}
            </button>{' '}
            <div title="Первоначальное имя">Первоначальное имя</div>
          </>
        ),
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        header: 'Фамилия',
      },
    ],
  },
  {
    header: 'Информация',
    columns: [
      {
        accessorKey: 'age',
        header: 'Количество лет',
        meta: {
          collapseVisible: ['visits', 'status'],
        },
      },
      {
        accessorKey: 'more',
        id: 'more',
        header: 'Больше информации',
        columns: [
          {
            accessorKey: 'visits',
            header: 'Визит',
          },
          {
            accessorKey: 'status',
            header: 'Status',
            cell: (props) => (
              <Badge
                size="s"
                status="normal"
                label="Черновик"
              />
            ),
          },
          {
            accessorKey: 'progress',
            header: 'Профиль прогресс',
          },
        ],
      },
    ],
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
  console.log(regenerateData);
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
        data={[
          {
            isOnly: true,
            firstName: 'Допустим вложенны элемент',
            subRows: [
              {
                firstName: 'aftermath-g4ydv',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'aftermath-g4ydv',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'aftermath-g4ydv',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'aftermath-g4ydv',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'aftermath-g4ydv',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
            ],
          },
          {
            firstName: 'Вложенные элементы',
            visits: 'Привет',
            subRows: [
              {
                firstName: 'aftermath-g4ydv',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'aftermath-g4ydv',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'aftermath-g4ydv',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'aftermath-g4ydv',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'aftermath-g4ydv',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
            ],
          },
          {
            firstName: '0 помощи от Влада',
            age: 'Нету',
            subRows: [
              {
                firstName: 'Дурачек потому что',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
                subRows: [
                  {
                    firstName: 'А еще козел',
                    lastName: 'mixture-hykkg',
                    age: 11,
                    visits: 94,
                    progress: 70,
                    status: 'complicated',
                  },
                  {
                    firstName: 'Даже нормально позвонить не может когда просят',
                    lastName: 'mixture-hykkg',
                    age: 11,
                    visits: 94,
                    progress: 70,
                    status: 'complicated',
                  },
                ],
              },
              {
                firstName: 'Полный не человек',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'Лижбы письюку дрочить',
                lastName: 'mixture-hykkg',
                age: 'Нету',
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'Человек дождя',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'Человек муравей',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'Ладно внес 1%',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
            ],
          },
          {
            firstName: 'Как дела у const таблицы ?',
            lastName: 'mixture-hykkg',
            age: 11,
            visits: 94,
            progress: 70,
            status: 'complicated',
            subRows: [
              {
                firstName: 'Все хорошо ?',
                lastName: 'mixture-hykkg',
                age: 11,
                visits: 94,
                progress: 70,
                status: 'complicated',
              },
              {
                firstName: 'Прошу не судить за текущую таблицу',
              },
              {
                firstName: 'Под банкой пива писал за день',
              },
            ],
          },
          ...regenerateData,
        ]}
      />
    </div>
  );
}

export default App;
