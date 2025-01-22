import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContainerX from "../components/shared/ContainerX";
import { AuthButton } from "../components/shared/AuthButton";
import useAuth from "../customHooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function SignIn() {
    const location = useLocation();
    const redirectTo = location.state?.from || '/';
    const navigate = useNavigate();
    //console.log(redirectTo);

    const { signIn } = useAuth();

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        signIn(data.email, data.password)
        .then(res => {
            console.log(res.user);
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Login Success!",
            });
            navigate(redirectTo, { replace: true });
        })
        .catch(err => {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something error!",
            });
        });
        
    };
    return (
        <ContainerX>
            <div className="w-full flex flex-col items-center">
                <Card color="transparent" shadow={false} className="mx-auto">
                    <Typography variant="h4" color="blue-gray">
                        Sign In
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Welcome back! Enter your details to login.
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-4">
                            <Input
                                {...register("email", { required: "Email is required" })}
                                className="min-w-96" label="Email" type="email" size="lg" placeholder="example@mail.com"
                            />
                            <p className="text-red-500">{errors.email?.message}</p>

                            <Input
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{7,})/,
                                        message: "Password must be at least 6 digits long, contain a capital letter and a special character"
                                    }
                                })}
                                className="min-w-96"
                                label="Password"
                                type="password"
                                size="lg"
                                placeholder="one letter, one special character, 7 characters long"
                            />
                            <p className="text-red-500">{errors.password?.message}</p>
                            <Button className="" variant="gradient" type="submit" fullWidth>Sign In</Button>
                        </div>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Don't have an account?{" "}
                            <Link to={'/signup'} state={{ from: redirectTo }} className="font-medium mt-4 text-gray-900 underline">
                                Sign Up
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