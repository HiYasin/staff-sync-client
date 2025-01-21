import { Button } from "@material-tailwind/react";
import React from 'react';
import useAuth from "../../customHooks/useAuth";
import useAxios from "../../customHooks/useAxios";

export function AuthButton() {
    const { googleSignIn } = useAuth();
    const [axiosPublic] = useAxios();

    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(res =>{
            //console.log(res.user);
            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName
            }
            // axiosPublic.post('users', userInfo)
            // .then(res => {
            //     console.log(res.data);
            // });
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