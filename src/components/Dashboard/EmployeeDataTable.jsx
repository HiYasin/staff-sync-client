import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Mail,
  Phone,
  Search,
  User,
} from "lucide-react";

import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> ID
      </span>
    ),
  }),

  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> Name
      </span>
    ),
  }),
  columnHelper.accessor("email", {
    id: "email",
    cell: (info) => (
      <span className="italic text-blue-600">{info.getValue()}</span>
    ),
    header: () => (
      <span className="flex items-center">
        <Mail className="mr-2" size={16} /> Email
      </span>
    ),
  }),
  columnHelper.accessor("phone", {
    header: () => (
      <span className="flex items-center">
        <Phone className="mr-2" size={16} /> Phone
      </span>
    ),
    cell: (info) => info.getValue(),
  }),
];

const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];

export default function EmployeeDataTable() {
  const [data, setData] = useState([])
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  useEffect(() => {
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 2,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  table.getRowModel().rows.map((row) => {
    row.getVisibleCells().map(cell => console.log(cell.column.columnDef.cell, cell.getContext()))
  })
  //console.log(table.getRowModel());
  return (
    <Card className="h-full w-full border mt-10">
      <div className="h-10">
        <h1 className="text-center w-full pt-5 text-xl font-bold">Work Sheet</h1>
      </div>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Typography>
                  </th>
                ))}
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-100"
                  >
                   Action
                  </Typography>
                </th>
              </tr>
            ))}
          </thead>
          <tbody>
            {/* {TABLE_ROWS.map(
              ({ img, name, email, job, org, online, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {job}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {org}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={online ? "online" : "offline"}
                          color={online ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit Data">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete Data">
                        <IconButton variant="text">
                          <TrashIcon className="h-4 w-4 text-red-500" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )} */}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {/* {data access system} */}
                {/* {
                  row.getVisibleCells()[0].column.columnDef.cell(row.getVisibleCells()[0].getContext())
                } */}
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td >
                  <Tooltip content="Edit Data">
                    <IconButton variant="text" onClick={() => alert(row.getVisibleCells()[0].column.columnDef.cell(row.getVisibleCells()[0].getContext()))}>
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="Delete Data">
                    <IconButton variant="text">
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700 w-full">
          <div className="flex items-center mb-4 sm:mb-0">
            <span className="mr-2">Items per page</span>
            <select
              className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[2, 5, 10, 20, 30].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft size={20} />
            </button>

            <button
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={20} />
            </button>

            <span className="flex items-center">
              <input
                min={1}
                max={table.getPageCount()}
                type="number"
                value={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="w-16 p-2 rounded-md border border-gray-300 text-center"
              />
              <span className="ml-1">of {table.getPageCount()}</span>
            </span>

            <button
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={20} />
            </button>

            <button
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight size={20} />
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}