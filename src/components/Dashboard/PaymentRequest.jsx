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
    ButtonGroup,
    Input,
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


// stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);


//tanstack table
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
    columnHelper.accessor("salary", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <LandmarkIcon className="mr-2" size={16} />
                Salary
            </span>
        ),
    }),
    columnHelper.accessor(row => `${row.month} ${row.year}`, {
        id: 'monthYear',
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <UserCheck className="mr-2" size={16} />
                Month & Year
            </span>
        ),
    }),
    columnHelper.accessor("date", {
        cell: (info) => info.getValue(),
        header: () => (
            <span className="flex items-center">
                <LandmarkIcon className="mr-2" size={16} />
                Payment Date
            </span>
        ),
    }),
];


export default function PaymentRequest() {

    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    const [data, setData] = useState([]);
    const [axiosSecure] = useAxios();

    const { refetch, data: payRequest = [] } = useQuery({
        queryKey: ['payRequest'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment`);
            return res.data;
        }
    });


    useEffect(() => {
        //setData(payRequest);
        setData(payRequest.sort((a, b) => (a.status === 'unpaid' ? -1 : 1)));
    }, [payRequest]);
    //console.log(data);

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


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const [paymentInfo, setPaymentInfo] = useState({});

    const handlePayConfirm = async (payInfo) => {
        setPaymentInfo(payInfo);;
        handleOpen();
    }

    const [view, setView] = useState(true);

    return (
        <>
            <Card className="h-full w-full border mt-10">
                <h1 className="text-center w-full py-5 text-xl font-bold">Payment Request</h1>
                <div className="w-fit mx-auto">
                    <ButtonGroup variant="outlined">
                        <Button className={`${view && 'bg-gray-900 text-white'}`} onClick={() => { setView(!view) }}>Table View</Button>
                        <Button className={`${!view && 'bg-gray-900 text-white'}`} onClick={() => { setView(!view) }}>Card View</Button>
                    </ButtonGroup>
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
                                        index !== 0 ? (
                                            <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {cell.column.id === "date" ?
                                                    (
                                                        cell.getValue() ?
                                                            <Typography variant="small" className="text-center">{cell.getValue()}</Typography>
                                                            :
                                                            <p className="text-center">-</p>
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
                                        <Button variant="filled" disabled={row.original.status === 'paid'} size="sm" onClick={() => handlePayConfirm(row.original)}>
                                            {row.original.status === 'paid' ? "Confirmed" : "Confirm"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
                <CardBody className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 ${view && 'hidden'}`}>
                    {data.map((request, i) => (
                        <div key={request._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md">
                            <Typography variant="h6" className="mb-2">
                                {request.name}
                            </Typography>
                            <Typography variant="paragraph" className="mb-2">
                                Amount: {request.email}
                            </Typography>
                            <Typography variant="paragraph" className="mb-2">
                                Amount: {request.salary}$
                            </Typography>
                            <Typography variant="paragraph" className="mb-2">
                                Status: {request.month}, {request.year}
                            </Typography>
                            <Button variant="filled" disabled={request.status === 'paid'} size="sm" onClick={() => handlePayConfirm(request)}>{request.status === 'paid' ? 'Confirmed' : 'Confirm'}</Button>
                        </div>
                    ))}
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
            </Card >
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogHeader className="text-center">Confirm Payment</DialogHeader>
                <DialogBody>
                    <div className="grid gap-5">
                        <div className="border rounded-md border-blue-gray-200 p-4 text-center space-y-1">
                            <div className="text-left px-2">
                                Name: <span className="font-semibold">{paymentInfo?.name}</span>
                            </div>
                            <div className="text-left px-2">
                                Email: <span className="font-semibold">{paymentInfo?.email}</span>
                            </div>
                            <div className="text-left px-2">
                                Payment Month: <span className="font-semibold">{paymentInfo?.month}, {paymentInfo?.year}</span>
                            </div>
                            <div className="text-left px-2">
                                Salary Amount: <span className="text-green-600 bg-green-100/50 rounded-md px-2 py-1">{paymentInfo?.salary}$</span>
                            </div>
                        </div>
                        {/* checkout form */}
                        <Elements stripe={stripePromise}>
                            <CheckoutForm paymentInfo={paymentInfo} refetch={refetch} handleOpen={handleOpen}>
                            </CheckoutForm>
                        </Elements>

                        <div className="grid mt-2">
                            <Button variant="outlined" color="red" onClick={handleOpen} className="min-w-[100px]" > <span>Cancel</span> </Button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}