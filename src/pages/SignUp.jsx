import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ContainerX from "../components/shared/ContainerX";
import { AuthButton } from "../components/shared/AuthButton";
import { ArchiveBoxArrowDownIcon, PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function SignUp() {
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
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Name
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
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Upload Photo
                            </Typography>

                            <div className="">
                                <label htmlFor="cover-photo" className="block">
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                                            <div className="mt-4 flex text-sm/6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span className="bg-gray-200 text-gray-900 rounded-full p-2">Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-2">or drag and drop</p>
                                            </div>
                                            <p className="text-xs/5 pt-2 text-gray-600">PNG, JPG, GIF less than 10MB</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <Checkbox
                            label={
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center font-normal"
                                >
                                    I agree the
                                    <a
                                        href="#"
                                        className="font-medium transition-colors hover:text-gray-900"
                                    >
                                        &nbsp;Terms and Conditions
                                    </a>
                                </Typography>
                            }
                            containerProps={{ className: "-ml-2.5" }}
                        />
                        <Button className="mt-6" fullWidth>
                            sign up
                        </Button>
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