import { useState } from "react";
import {
    Button,
    Input,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import DatePicker from "../shared/DatePicker";
import EmployeeDataTable from "./EmployeeDataTable";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import useAuth from "../../customHooks/useAuth";
import useAxios from "../../customHooks/useAxios";
import { format } from "date-fns";
import useTask from "../../customHooks/useTask";
import Swal from "sweetalert2";

export default function WrokSheet() {



    const { userInfo } = useAuth();
    const [axiosSecure] = useAxios();
    //console.log(userInfo);
    const [task, refetch] = useTask();
    const [date, setDate] = useState(new Date());
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        // console.log({ ...data, date: date });
        const task = { ...data, date: format(date, "PPp"), email: userInfo.email };
        console.log(task);
        const res = await axiosSecure.post("/work-sheet", task);
        //console.log(res.data);
        if (res.data.acknowledged) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Data added successfully",
            });
            refetch();
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Data add failed!",
            });
        }
    };

    return (
        <div className="mt-5">
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
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
                            }
                        })} size="lg" />
                        <p className="text-red-500">{errors.workHours?.message}</p>
                    </div>
                    <DatePicker date={date} setDate={setDate}></DatePicker>
                    <Button variant="gradient" type="submit" className="min-w-[200px] flex justify-center items-center gap-2"><PlusCircleIcon className="w-5"></PlusCircleIcon> Add Data</Button>
                </form>
            </div>
            <div className="my-4">
                <EmployeeDataTable></EmployeeDataTable>
            </div>
        </div>
    );
}