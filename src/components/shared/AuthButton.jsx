import { Button } from "@material-tailwind/react";

export function AuthButton() {
    return (
        <div className="flex flex-col items-center gap-4">
            <Button size="sm" color="white" className="flex items-center gap-3 border">
                <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
                Continue with Google
            </Button>
        </div>
    );
}