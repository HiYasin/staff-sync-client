import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContainerX from "../components/shared/ContainerX";
import { AuthButton } from "../components/shared/AuthButton";

export default function SignIn() {
    const location = useLocation();
    const redirectTo = location.state?.from || '/';
    const navigate = useNavigate();
    //console.log(redirectTo);
    
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
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Password
                            </Typography>
                            <Input
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                        <Button className="mt-10" fullWidth>
                            sign up
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Don't have an account?{" "}
                            <Link to={'/signup'} state={{ from: redirectTo }} className="font-medium text-gray-900 underline">
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