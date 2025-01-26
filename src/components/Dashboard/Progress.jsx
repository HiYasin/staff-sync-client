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
    CalendarDays,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    CircleUserRoundIcon,
    CircleXIcon,
    ListCheck,
    MailCheckIcon,
    Search,
    Timer,
    User,
} from "lucide-react";
import {
    Card,
    Typography,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { format, set } from "date-fns";
import useAxios from "../../customHooks/useAxios";
import useAuth from "../../customHooks/useAuth";
import { useForm } from "react-hook-form";
import RawDayPicker from "../shared/RawDayPicker";
import Swal from "sweetalert2";
import useEmployee from "../../customHooks/useEmployee";
import { Link } from "react-router-dom";
import useTaskAll from "../../customHooks/useTaskAll";

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("_id", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <User className="mr-2" size={16} />
                id
            </span>
        ),
    }),
    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <CircleUserRoundIcon className="mr-2" size={16} />
                Name
            </span>
        ),
    }),

    columnHelper.accessor("email", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <MailCheckIcon className="mr-2" size={16} />
                Email
            </span>
        ),
    }),
    columnHelper.accessor("task", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <ListCheck className="mr-2" size={16} />
                Task
            </span>
        ),
    }),

    columnHelper.accessor("workHours", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <Timer className="mr-2" size={16} />
                Work Hours
            </span>
        ),
    }),
    columnHelper.accessor("date", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <CalendarDays className="mr-2" size={16} />
                Time
            </span>
        ),
    }),
];


export default function Progress() {

    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    const [task] = useTaskAll([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        setData(task);
    }, [task]);
    //console.log(data);


    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [selectedMonth, setSelectedMonth] = React.useState("");


    const handleMonthFilter = (e) => {
        setSelectedMonth(e.target.value);
        const selectedMonthValue = months.find((month) => month === e.target.value);

        if (selectedMonthValue) {
            const filteredData = task.filter((item) => format(item.date, "MMM") === e.target.value);
            setData(filteredData);
        } else {
            setData([...task]);
        }
    };

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <>
            <Card className="h-full w-full border mt-10">
                <div className="h-fit">
                    <h1 className="text-center w-full pt-5 text-xl font-bold">Work Sheet</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-4 p-5 md:px-10">
                    <>
                        <input
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search with name/ task/ email"
                            className="w-full bg-white border border-blue-gray-200 placeholder:text-slate-400 text-slate-400 text-sm rounded-md pl-3 pr-8 py-2.5 transition duration-300 ease appearance-none cursor-pointer focus:border-gray-900 focus:border-2"
                        />
                    </>

                    <>
                        <select
                            value={selectedMonth}
                            onChange={handleMonthFilter}
                            className="w-full bg-white border border-blue-gray-200 placeholder:text-slate-400 text-slate-400 text-sm rounded-md pl-3 pr-8 py-2.5 transition duration-300 ease appearance-none cursor-pointer focus:border-gray-900 focus:border-2"
                        >
                            <option value="">Select Month</option>
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </>
                </div>

                <CardBody className="overflow-x-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header, index) => (
                                        <th
                                            key={header.id}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            {
                                                index !== 0 ?
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
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        <ArrowUpDown className="ml-2" size={14} />
                                                    </Typography>
                                                    :
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal leading-none opacity-70"
                                                    >
                                                        SL
                                                    </Typography>
                                            }
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row, i) => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    {row.getVisibleCells().map((cell, index) => (
                                        index !== 0 ? (
                                            <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {cell.column.id === "verified" ?
                                                    (
                                                        cell.getValue() ?
                                                            <Tooltip content="Verified">
                                                                <IconButton variant="text">
                                                                    <CheckCircle className="text-green-400"></CheckCircle>
                                                                </IconButton>

                                                            </Tooltip>
                                                            :
                                                            <Tooltip content="Not Verified">
                                                                <IconButton variant="text" onClick={() => handleVerify(row.original._id)}>
                                                                    <CircleXIcon className="text-red-500" />
                                                                </IconButton>
                                                            </Tooltip>
                                                    )
                                                    :
                                                    (flexRender(cell.column.columnDef.cell, cell.getContext()))
                                                }
                                            </td>
                                        ) : (
                                            <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i + 1}</td>
                                        )
                                    ))}
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
                                className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-2 py-1 appearance-none"
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value));
                                }}
                            >
                                {[5, 10, 15].map((pageSize) => (
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
                                <span className="ml-1">{table.getState().pagination.pageIndex + 1}</span>
                                <span className="ml-1"> of {table.getPageCount()}</span>
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

        </>
    );
}