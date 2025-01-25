import { Button } from "@material-tailwind/react";
import React from 'react';
import useAuth from "../../customHooks/useAuth";
import useAxios from "../../customHooks/useAxios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

export function AuthButton() {
    const { googleSignIn } = useAuth();
    const [axiosPublic] = useAxios();
    const location = useLocation();
    const redirectTo = location?.state?.from || '/';
    const navigate = useNavigate();
    //console.log(redirectTo);
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(async (res) => {
                //console.log(res.user);
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    bank_account: 123456,
                    designation: 'Engineer',
                    salary: 15000,
                    role: 'employee',
                    image: res.user?.photoURL,
                    verified: false,
                }

                const response = await axiosPublic.post('/users', userInfo);
                if (response.data.insertedId) {
                    Swal.fire({
                        icon: "scuccess",
                        title: "Success",
                        text: "Register & Login Successfully!",
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Login Successfully!",
                    });
                }
                navigate(redirectTo, { replace: true });
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Try Again",
                    text: "Oops...Something went wrong!",
                });
            });
    }
    return (
        <div className="flex flex-col items-center gap-4">
            <Button size="sm" color="white" className="flex items-center gap-3 border" onClick={handleGoogleSignIn}>
                <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
                Continue with Google
            </Button>
        </div>
    );
}