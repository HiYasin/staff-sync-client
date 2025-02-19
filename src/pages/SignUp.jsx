import {
    Card,
    Input,
    Button,
    Typography
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContainerX from "../components/shared/ContainerX";
import { AuthButton } from "../components/shared/AuthButton";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import useAxios from "../customHooks/useAxios";
import axios from 'axios';
import Swal from "sweetalert2";
import useAuth from "../customHooks/useAuth";

export default function SignUp() {
    const location = useLocation();
    const redirectTo = location.state?.from || '/';
    const navigate = useNavigate();
    //console.log(redirectTo);
    const { createUser } = useAuth();

    const [axiosPublic] = useAxios();
    const imageKey = import.meta.env.VITE_imageUploadKey;
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageKey}`;

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        //console.log(data);
        const imageFile = { image: data.image[0] };
        let imageUrl = null;

        createUser(data.email, data.password)
            .then(async (response) => {
                //console.log("firebase:",response);
                if (data.image && data.image[0]) {
                    const res = await axios.post(imageHostingApi, imageFile, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    if (res.data.success) {
                        imageUrl = res.data.data.display_url;
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "ImgDB Error",
                            text: "Something error!",
                        });
                    }
                }

                //console.log("imgdb:",res.data);

                const userInfo = {
                    name: data.name,
                    email: data.email,
                    bank_account: data.bank_account,
                    designation: data.designation,
                    salary: data.salary,
                    role: data.role,
                    image: imageUrl,
                    verified: false,
                    status: 'running',
                }
                //console.log(userInfo);
                const result = await axiosPublic.post('/users', userInfo);
                //console.log("mongo:", response.data);
                if (result.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Register & Login Success!",
                    });
                    navigate(redirectTo, { replace: true });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Account already exist!",
                    });
                }
            })
            .catch((err) => {
                // console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Firebase Error",
                    text: "Something error!",
                });
            });
    };
    //const onSubmit = (data) => console.log(data);
    return (
        <ContainerX>
            <div className="w-full flex flex-col items-center">
                <Card color="transparent" shadow={false} className="mx-auto">
                    <Typography variant="h4" color="blue-gray" className="dark:text-white">
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
                                    className=" " label="Name" type="text" size="lg" placeholder="Your name"
                                />
                                <p className="text-red-500">{errors.name?.message}</p>
                            </div>

                            <div>
                                <Input
                                    {...register("email", { required: "Email is required" })}
                                    className=" " label="Email" type="email" size="lg" placeholder="example@mail.com"
                                />
                                <p className="text-red-500">{errors.email?.message}</p>
                            </div>

                            <div>
                                <Input
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/,
                                            message: "Password must be at least 6 digits long, contain a capital letter and a special character"
                                        }
                                    })}
                                    className=" "
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
                                    className="" label="Bank Account" type="text" size="lg" placeholder="e.g. 123465"
                                />
                                <p className="text-red-500">{errors.bank_account?.message}</p>
                            </div>


                            <div>
                                <Input
                                    {...register("designation", { required: "Designation is required" })}
                                    className=" " label="Designation" type="text" size="lg" placeholder="e.g. Sales Assistant, Social Media executive"
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
                                    className=" " label="Salary" type="number" size="lg" placeholder="e.g. 25000"
                                />
                                <p className="text-red-500">{errors.salary?.message}</p>
                            </div>
                            <div>
                                <select {...register("role", { required: "Role is required" })} defaultValue={''}
                                    className="w-full bg-white border border-blue-gray-200 placeholder:text-slate-400 text-slate-400 text-sm rounded-md pl-3 pr-8 py-2.5 transition duration-300 ease appearance-none cursor-pointer focus:border-gray-900 focus:border-2">
                                    <option disabled value=''>Select a role</option>
                                    <option value="hr">HR</option>
                                    <option value="employee">Employee</option>
                                </select>
                                <p className="text-red-500">{errors.role?.message}</p>
                            </div>

                            <div className="border rounded-md border-blue-gray-200 focus:border-gray-900 text-blue-gray-700 flex items-center overflow-hidden max-w-96">
                                <input {...register("image")} type="file" className="mx-2 cursor-pointer file:rounded-md file:text-sm file:px-4 file:py-1 file:border-0 file:outline-1" />
                            </div>
                        </div>
                        <div className="max-w-sm mx-auto col-span-2">
                            <Button className="mt-4 dark:bg-white dark:text-black" type="submit" fullWidth>Sign Up</Button>
                        </div>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link to={'/signin'} state={{ from: redirectTo }} className="font-medium text-gray-900 underline dark:text-white">
                                Sign In
                            </Link>
                        </Typography>
                    </form>
                    <div className="relative my-4 w-full">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white dark:bg-black px-2 text-gray-500">Or</span>
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