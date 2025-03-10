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
    ChevronsUp,
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
    Input,
    ButtonGroup,
    Avatar,
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
import { useQuery } from "@tanstack/react-query";

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
    columnHelper.accessor("designation", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <LandmarkIcon className="mr-2" size={16} />
                Designation
            </span>
        ),
    }),
    columnHelper.accessor("role", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <UserCheck className="mr-2" size={16} />
                Role
            </span>
        ),
    }),
];


export default function AllEmployee() {

    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    const [data, setData] = useState([]);
    const [axiosSecure] = useAxios();

    const { refetch, data: employees = [] } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/all`);
            //console.log(res.data.status);
            return res.data;
        }
    });
    //console.log(employees);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        setData(employees);
        //console.log(employees);
    }, [employees]);

    //console.log(userInfo);
    const { register, formState: { errors }, handleSubmit, setValue, watch } = useForm();

    const handlePromote = async (id) => {
        try {
            const res = await axiosSecure.patch(`/users/promote/${id}`);
            //console.log(res.data);
            if (res.data.modifiedCount > 0 && res.data.acknowledged) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Employee promoted to HR successfully",
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
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred!",
            });
        }
    }


    const [currentSalary, setCurrentSalary] = useState(0);
    const onSubmit = async (data) => {
        //console.log(data, currentSalary);
        try {
            const res = await axiosSecure.patch(`/salary-increment/${data.id}`, { salary: data.salary });
            //console.log(res.data);
            if (res.data.modifiedCount > 0 && res.data.acknowledged) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Salary increment successfully",
                });
                refetch();
                handleOpen();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong!",
                });
            }
        } catch (error) {
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred!",
            });
        }
    };

    const handleIncrementSalary = async (id, salary) => {
        setCurrentSalary(salary);
        handleOpen();
        setValue('salary', salary);
        setValue('id', id);
    }
    const handleFire = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, fire him!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/fire/${id}`);
                    console.log(res.data);
                    if (res.data.modifiedCount > 0 && res.data.acknowledged) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Employee fired successfully",
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
                    console.log(error)
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "An error occurred while verifying the user.",
                    });
                }
            }
        });
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

    const [view, setView] = useState(true);

    return (
        <div className="pb-5 md:pb-10">
            <Card className="h-full w-full border mt-10 dark:bg-gray-600 dark:text-white">
                <div className="h-fit">
                    <h1 className="text-center w-full py-5 text-xl font-bold">All Employee List</h1>
                    <div className="w-fit mx-auto">
                        <ButtonGroup variant="outlined">
                            <Button className={`${view && 'bg-gray-900 text-white'}`} onClick={() => { setView(!view) }}>Table View</Button>
                            <Button className={`${!view && 'bg-gray-900 text-white'}`} onClick={() => { setView(!view) }}>Card View</Button>
                        </ButtonGroup>
                    </div>
                </div>
                <CardBody className={`overflow-x-scroll px-0 ${!view && 'hidden'}`}>
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
                                        row.original.verified && (index !== 0 ?
                                            <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {
                                                    cell.column.id === 'role' ?
                                                        (cell.getValue().toUpperCase())
                                                        :
                                                        (flexRender(cell.column.columnDef.cell, cell.getContext()))
                                                }
                                            </td>
                                            :
                                            <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{i + 1}</td>
                                        )
                                    ))}
                                    {
                                        row.original.verified &&
                                        <td className="space-x-2">
                                            {
                                                row.original.status === 'running' ?
                                                    <>
                                                        <Button variant="filled" disabled={row.original.role === 'hr'} size="sm" onClick={() => handlePromote(row.original._id)}>Make HR</Button>
                                                        <Button variant="filled" size="sm" onClick={() => handleIncrementSalary(row.original._id, row.original.salary)}>
                                                            <span>Salary</span><ChevronsUp className="inline ml-2 bg-white rounded-full text-black" size={16} />
                                                        </Button>
                                                        <Button variant="filled" color="red" size="sm" onClick={() => handleFire(row.original._id)}>Fire</Button>
                                                    </>
                                                    :
                                                    <>
                                                        <Button variant="filled" size="sm" disabled>Make HR</Button>
                                                        <Button variant="filled" size="sm" disabled>Salary++</Button>
                                                        <span className="text-sm text-red-900 bg-red-100 px-3 py-1 rounded-full w-fit">Fired</span>
                                                    </>

                                            }
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
                <CardBody className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 ${view && 'hidden'}`}>
                    {data.map((row, i) => (
                        row.verified && (
                            <div key={row._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md grid justify-center">
                                <Avatar
                                    variant="circular"
                                    size="xxl"
                                    alt={row.name}
                                    className="border border-gray-900 p-0.5 mx-auto my-5"
                                    src={row.image}
                                />
                                <Typography variant="paragraph" className="mb-2">
                                    Name: {row.name}
                                </Typography>
                                <Typography variant="paragraph" className="mb-2">
                                    Role: {row.role.toUpperCase()}
                                </Typography>
                                <Typography variant="paragraph" className="mb-2">
                                    Designation: {row.designation}
                                </Typography>
                                <Typography variant="paragraph" className="mb-2">
                                    Email: {row.email}
                                </Typography>
                                <div className="space-x-2">
                                    {row.status === 'running' ? (
                                        <>
                                            <Button variant="filled" disabled={row.role === 'hr'} size="sm" onClick={() => handlePromote(row._id)}>Make HR</Button>
                                            <Button variant="filled" size="sm" onClick={() => handleIncrementSalary(row._id, row.salary)}>
                                                <span>Salary</span><ChevronsUp className="inline ml-2 bg-white rounded-full text-black" size={16} />
                                            </Button>
                                            <Button variant="filled" color="red" size="sm" onClick={() => handleFire(row._id)}>Fire</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="filled" size="sm" disabled>Make HR</Button>
                                            <Button variant="filled" size="sm" disabled>Salary++</Button>
                                            <span className="text-sm text-red-900 bg-red-100 px-3 py-1 rounded-full w-fit">Fired</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    ))}
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700 w-full">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <span className="mr-2 dark:text-white">Items per page</span>
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
                                <span className="ml-1 dark:text-white">{table.getState().pagination.pageIndex + 1}</span>
                                <span className="ml-1 dark:text-white"> of {table.getPageCount()}</span>
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
                <DialogHeader className="text-center">Salary Increment</DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                        <div className="border rounded-md border-blue-gray-200 py-2 text-center">Current Salary: <span className="text-green-600 bg-green-100/50 rounded-md px-4 py-2">{currentSalary}</span></div>
                        <div>
                            <Input label="Salary" type="number" {...register("salary", {
                                required: "Salary is required",
                                min: {
                                    value: currentSalary,
                                    message: "Salary must be greater than current salary"
                                }
                            })} size="lg" />
                            <p className="text-red-500">{errors.salary?.message}</p>
                        </div>
                        <div className="grid gap-5">
                            <Button variant="outlined" color="red" onClick={handleOpen} className="min-w-[200px]" > <span>Cancel</span> </Button>
                            <Button variant="gradient" type="submit" className="min-w-[200px]">Confirm</Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </div>
    );
}