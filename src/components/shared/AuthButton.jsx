import { Button } from "@material-tailwind/react";
import React from 'react';
import useAuth from "../../customHooks/useAuth";
import useAxios from "../../customHooks/useAxios";
import Swal from "sweetalert2";

export function AuthButton() {
    const { googleSignIn } = useAuth();
    const [axiosPublic] = useAxios();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(async (res) => {
                //console.log(res.user);
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                    image: res.user?.photoURL
                }

                const response = await axiosPublic.post('/users', userInfo);
                if (response.data.insertedId) {
                    Swal.fire({
                        icon: "Success",
                        title: "Ok",
                        text: "Register & Login Success!",
                    });
                } else {
                    Swal.fire({
                        icon: "Success",
                        title: "Ok",
                        text: "Login Success!",
                    });
                }
            })
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