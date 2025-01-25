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
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    CircleUserRoundIcon,
    CircleXIcon,
    Command,
    DollarSign,
    LandmarkIcon,
    MailCheckIcon,
    User,
    UserCheck,
} from "lucide-react";
import {
    Card,
    Typography,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
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
    columnHelper.accessor("bank_account", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <LandmarkIcon className="mr-2" size={16} />
                Bank Account
            </span>
        ),
    }),
    columnHelper.accessor("verified", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <UserCheck className="mr-2" size={16} />
                Verification
            </span>
        ),
    }),
    columnHelper.accessor("salary", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <DollarSign className="mr-2" size={16} />
                Salary
            </span>
        ),
    }),
];


export default function EmployeeList() {

    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    const [employees, refetch] = useEmployee([]);
    const [data, setData] = useState([]);
    const [axiosSecure] = useAxios();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        setData(employees);
        //console.log(employees);
    }, [employees]);

    const { userInfo } = useAuth();
    //console.log(userInfo);
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();

    const onSubmit = async (data) => {
        const payEmployee = { ...data };
        //console.log(payEmployee);
        const res = await axiosSecure.post(`/pay`, payEmployee);
        //console.log(res.data);
        if (res.data.acknowledged && res.data.insertedId) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Payment request send successfully",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: res.data.message,
            });
        }
        //console.log(res.data);
    };
    const handlePay = (email, salary) => {
        console.log(email, salary);
        setValue('salary', salary);
        setValue('email', email);
        setValue('status', 'unpaid');
        handleOpen();
    }
    const handleVerify = async (id) => {
        try {
            const res = await axiosSecure.patch(`/users/verify/${id}`);
            console.log(res.data);
            if (res.data.modifiedCount > 0 && res.data.acknowledged) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "User verified successfully",
                });
                refetch();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong!",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while verifying the user.",
            });
        }
    };


    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const years = Array.from({ length: 10 }, (_, i) => i + 2020);
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

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
                <div className="h-10">
                    <h1 className="text-center w-full pt-5 text-xl font-bold">Work Sheet</h1>
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
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-100 flex"
                                        >
                                            <Command className="mr-2" size={16} />
                                            Action
                                        </Typography>
                                    </th>
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
                                    <td className="space-x-2">
                                        <Button
                                            variant="filled"
                                            size="sm"
                                            onClick={() => { handlePay(row.original.email, row.original.salary)}}
                                            disabled={!row.original.verified}
                                        >Pay</Button>

                                        <Link className="cursor-pointerm border-2 border-gray-900 px-3 py-2 text-xs rounded-md" to={`/employee/${row.original._id}`}>Details</Link>
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
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogHeader className="text-center">Create Payment Request</DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                        <div className="border rounded-md border-blue-gray-200 py-2 text-center">Current Salary: <span className="text-green-600 bg-green-100/50 rounded-md px-4 py-2">{userInfo.salary}$</span></div>
                        <div>
                            <select {...register("month", { required: "Month is required" })} defaultValue={''}
                                value={month}
                                onChange={e => setMonth(e.target.value)}
                                className="w-full bg-white border border-blue-gray-200 placeholder:text-slate-400 text-slate-400 text-sm rounded-md pl-3 pr-8 py-2.5 transition duration-300 ease appearance-none cursor-pointer focus:border-gray-900 focus:border-2"
                            >
                                <option value="">Select Month</option>
                                {months.map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <p className="text-red-500">{errors.month?.message}</p>
                        </div>
                        <div>
                            <select {...register("year", { required: "Year is required" })} defaultValue={''}
                                value={year}
                                onChange={e => setYear(e.target.value)}
                                className="w-full bg-white border border-blue-gray-200 placeholder:text-slate-400 text-slate-400 text-sm rounded-md pl-3 pr-8 py-2.5 transition duration-300 ease appearance-none cursor-pointer focus:border-gray-900 focus:border-2"
                            >
                                <option value="">Select Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>

                            <p className="text-red-500">{errors.year?.message}</p>
                        </div>
                        <div className="grid gap-5">
                            <Button variant="outlined" color="red" onClick={handleOpen} className="min-w-[200px]" > <span>Cancel</span> </Button>
                            <Button variant="gradient" type="submit" className="min-w-[200px]" onClick={handleOpen}>Confirm</Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}