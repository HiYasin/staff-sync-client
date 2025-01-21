import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ContainerX from "../components/shared/ContainerX";
import { AuthButton } from "../components/shared/AuthButton";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import useAxios from "../customHooks/useAxios";
import axios from 'axios';
import Swal from "sweetalert2";

export default function SignUp() {
    const [axiosPublic] = useAxios();
    const imageKey = import.meta.env.VITE_imageUploadKey;
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageKey}`;

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] };



        const res = await axios.post(imageHostingApi, imageFile, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        //console.log(res.data);
        //console.log(res.data.data.display_url);

        if (res.data.success) {
            const userInfo = {
                name: data.name,
                email: data.email,
                bank_account: data.bank_account,
                designation: data.designation,
                salary: data.salary,
                role: data.role,
                image: res.data.data.display_url
            }
            console.log(userInfo);
            const response = await axiosPublic.post('/users', userInfo);
            console.log(response.data);
            if (response.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Ok",
                    text: "Register & Login Success!",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Ok",
                    text: "Something error!",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Ok",
                text: "Something error!",
            });
        }


    };
    //const onSubmit = (data) => console.log(data);
    return (
        <ContainerX>
            <div className="w-full flex flex-col items-center">
                <Card color="transparent" shadow={false} className="mx-auto">
                    <Typography variant="h4" color="blue-gray">
                        Sign Up
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Nice to meet you! Enter your details to register.
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 max-w-screen-lg">
                        <div className="mb-1 grid md:grid-cols-2 gap-6">
                            <div>
                                <Input
                                    {...register("name", { required: "Name is required" })}
                                    className="min-w-96" label="Name" type="text" size="lg" placeholder="Your name"
                                />
                                <p className="text-red-500">{errors.name?.message}</p>
                            </div>

                            <div>
                                <Input
                                    {...register("email", { required: "Email is required" })}
                                    className="min-w-96" label="Email" type="email" size="lg" placeholder="example@mail.com"
                                />
                                <p className="text-red-500">{errors.email?.message}</p>
                            </div>

                            <div>
                                <Input
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{7,})/,
                                            message: "Password must be at least 7 characters long, contain a capital letter and a special character"
                                        }
                                    })}
                                    className="min-w-96"
                                    label="Password"
                                    type="password"
                                    size="lg"
                                    placeholder="one letter, one special character, 7 characters long"
                                />
                                <p className="text-red-500">{errors.password?.message}</p>
                            </div>

                            <div>
                                <Input
                                    {...register("bank_account", {
                                        required: "Bank account is required",
                                        minLength: {
                                            value: 6,
                                            message: "Bank account must be at least 6 characters"
                                        },
                                        maxLength: {
                                            value: 99,
                                            message: "Bank account must be less than 99 characters"
                                        }
                                    })}
                                    className="min-w-96" label="Bank Account" type="text" size="lg" placeholder="e.g. 123465"
                                />
                                <p className="text-red-500">{errors.bank_account?.message}</p>
                            </div>


                            <div>
                                <Input
                                    {...register("designation", { required: "Designation is required" })}
                                    className="min-w-96" label="Designation" type="text" size="lg" placeholder="e.g. Sales Assistant, Social Media executive"
                                />
                                <p className="text-red-500">{errors.designation?.message}</p>
                            </div>


                            <div>
                                <Input
                                    {...register("salary", {
                                        required: "Salary is required",
                                        min: {
                                            value: 10000,
                                            message: "Minimum salary is 10000"
                                        },
                                        max: {
                                            value: 50000,
                                            message: "Maximum salary is 50000"
                                        }
                                    })}
                                    className="min-w-96" label="Salary" type="number" size="lg" placeholder="e.g. 25000"
                                />
                                <p className="text-red-500">{errors.salary?.message}</p>
                            </div>


                            <select {...register("role", { required: "Role is required" })} defaultValue={''}
                                className="w-full bg-white border border-blue-gray-200 placeholder:text-slate-400 text-slate-400 text-sm rounded-md pl-3 pr-8 py-2.5 transition duration-300 ease appearance-none cursor-pointer focus:border-gray-900 focus:border-2">
                                <option disabled value=''>Select a role</option>
                                <option value="HR">HR</option>
                                <option value="Employee">Employee</option>
                            </select>
                            <p className="text-red-500">{errors.role?.message}</p>
                            <div className="md:col-span-2">
                                <label htmlFor="cover-photo" className="block">
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                                            <div className="mt-4 flex text-sm/6 text-gray-600">
                                                <label
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold "
                                                >
                                                    <span className="bg-gray-200 text-gray-900 p-2 rounded-full border">Upload a file</span>
                                                    <input {...register("image")} type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-2">or drag and drop</p>
                                            </div>
                                            <p className="text-xs/5 pt-2 text-gray-600">PNG, JPG, GIF less than 10MB</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="max-w-sm mx-auto col-span-2">
                            <Button className="mt-4" variant="gradient" type="submit" fullWidth>Sign Up</Button>
                        </div>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link to={'/signin'} className="font-medium text-gray-900 underline">
                                Sign In
                            </Link>
                        </Typography>
                    </form>
                    <div className="relative my-4 w-full">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or</span>
                        </div>
                    </div>
                    <div className="mb-8">
                        <AuthButton></AuthButton>
                    </div>
                </Card>

            </div>
        </ContainerX>
    );
}