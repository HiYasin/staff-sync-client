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
  User,
} from "lucide-react";

import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import useTask from "../../customHooks/useTask";
import useAxios from "../../customHooks/useAxios";
import useAuth from "../../customHooks/useAuth";
import { useForm } from "react-hook-form";
import DatePicker from "../shared/DatePicker";
import RawDayPicker from "../shared/RawDayPicker";
import Swal from "sweetalert2";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("_id", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> id
      </span>
    ),
  }),
  columnHelper.accessor("task", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> Task
      </span>
    ),
  }),

  columnHelper.accessor("workHours", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> Work Hours
      </span>
    ),
  }),
  columnHelper.accessor("date", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> Time
      </span>
    ),
  }),
  // columnHelper.accessor("email", {
  //   id: "email",
  //   cell: (info) => (
  //     <span className="italic text-blue-600">{info.getValue()}</span>
  //   ),
  //   header: () => (
  //     <span className="flex items-center">
  //       <Mail className="mr-2" size={16} /> Email
  //     </span>
  //   ),
  // }),
  // columnHelper.accessor("phone", {
  //   header: () => (
  //     <span className="flex items-center">
  //       <Phone className="mr-2" size={16} /> Phone
  //     </span>
  //   ),
  //   cell: (info) => info.getValue(),
  // }),
];


export default function EmployeeDataTable() {

  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [task, refetch] = useTask([]);
  const [data, setData] = useState([]);
  //console.log(task);

  const [axiosSecure] = useAxios();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    // if (task.length > 0) {
    //   setData(task);
    // }
    setData(task);
    //console.log(task);
  }, [task]);

  const { userInfo } = useAuth();
  const [date, setDate] = useState(new Date());
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();

  const [id, setId] = useState(null);
  const onSubmit = async (data) => {
    // console.log({ ...data, date: date });
    const task = { ...data, date: format(date, "PPp"), email: userInfo.email };
    //console.log(task);
    const res = await axiosSecure.put(`/work-sheet/${id}`, task);
    if (res.data.acknowledged && res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data updated successfully",
      });
      refetch();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Data update failed!",
      });
    }
    //console.log(res.data);
  };

  const handleEdit = async (id) => {
    const filter = task.filter((item) => item._id === id);
    //console.log(filter[0]);
    if (filter.length > 0) {
      const taskData = filter[0];
      setValue('task', taskData.task);
      setValue('workHours', taskData.workHours);
      setValue('date', taskData.date);
      setId(taskData._id);
    }
    handleOpen();
  }

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/work-sheet/${id}`);

          //console.log(res.data);
          if (res.data.acknowledged && res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            
          } else {
            Swal.fire({
              title: "Error!",
              text: "Data delete failed!",
              icon: "error"
            });
          }
        } catch (error) {
          //console.error("Error deleting data:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the data.",
            icon: "error"
          });
        }
      }
    });
  }

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
        <CardBody className="overflow-scroll px-0">
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
                      className="font-normal leading-none opacity-100"
                    >
                      Action
                    </Typography>
                  </th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, i) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {/* {data access system} */}
                  {/* {
                  row.getVisibleCells()[0].column.columnDef.cell(row.getVisibleCells()[0].getContext())
                } */}
                  {row.getVisibleCells().map((cell, index) => (
                    index !== 0 ?
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {/* access dataa 2nd method  row.getVisibleCells().map(cell => console.log(cell.column.columnDef.cell, cell.getContext())) */}

                        {/* index 2 te date gula ase tai index 2 check disi */}
                        {/* {index===2? dateFormatter(row.getVisibleCells()[index].column.columnDef.cell(row.getVisibleCells()[index].getContext())) : flexRender(cell.column.columnDef.cell, cell.getContext())} */}

                        {/* data access korar 3rd method */}
                        {/* {index === 2 ? dateFormatter(cell.column.columnDef.cell(cell.getContext())) : flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        {/* Ekane row.getVisibleCells()[index] = cell */}
                      </td> : <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i}</td>
                  ))}
                  {/* Action */}
                  <td >
                    <Tooltip content="Edit Data">
                      <IconButton variant="text" onClick={() => handleEdit(row.getVisibleCells()[0].column.columnDef.cell(row.getVisibleCells()[0].getContext()))}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Data">
                      <IconButton variant="text" onClick={() => handleDelete(row.getVisibleCells()[0].column.columnDef.cell(row.getVisibleCells()[0].getContext()))}>
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
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple modal.</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
            <div className="min-w-52 relative">
              <select {...register("task", { required: "Email is required" })} defaultValue={''}
                className="w-full bg-white border border-blue-gray-200 placeholder:text-slate-400 text-slate-400 text-sm rounded-md pl-3 pr-8 py-2.5 transition duration-300 ease appearance-none cursor-pointer focus:border-gray-900 focus:border-2">
                <option disabled value=''>Select a task</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Content">Content</option>
                <option value="Paper-work">Paper-work</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
              <p className="text-red-500">{errors.task?.message}</p>
            </div>

            <div>
              <Input label="Work Hours" type="number" {...register("workHours", {
                required: "Work hours is required",
                min: {
                  value: 1,
                  message: "Minimum hours is 1"
                },
                max: {
                  value: 50,
                  message: "Maximum hours is 50"
                },
              })} size="lg" />
              <p className="text-red-500">{errors.workHours?.message}</p>
            </div>
            <div className="relative">
              {/* <DatePicker date={date} setDate={setDate}></DatePicker> */}
            </div>
            <RawDayPicker date={date} setDate={setDate}></RawDayPicker>
            <div className="grid gap-5 md:grid-cols-2">
              <Button variant="outlined" color="red" onClick={handleOpen} className="min-w-[200px]" > <span>Cancel</span> </Button>
              <Button variant="gradient" type="submit" onClick={handleOpen} className="min-w-[200px]">Update Data</Button>

            </div>
          </form>
        </DialogBody>



      </Dialog>
    </>
  );
}