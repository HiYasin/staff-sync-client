import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import ContainerX from "../components/shared/ContainerX";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

export function Contact() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
            const res = await axios.post('https://staff-sync-server.vercel.app/contact', data);
            //console.log(res.data);
            if(res.data.insertedId && res.data.acknowledged){
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Message send success!",
                });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Message send failed!",
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Message send failed!",
            });
        }
    }
    return (
        <section className="px-8 py-8 lg:py-16">
            <ContainerX>
                <div className="container mx-auto text-center">
                    <Typography
                        variant="h1"
                        color="blue-gray"
                        className="mb-4 !text-3xl lg:!text-5xl dark:text-white"
                    >
                        We&apos;re Here to Help
                    </Typography>
                    <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
                        Whether it&apos;s a question about our services, a request for
                        technical assistance, or suggestions for improvement, our team is
                        eager to hear from you.
                    </Typography>
                    <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-center">
                        <div className="grid justify-center p-5 gap-5">
                            <div>
                                <MapPinIcon className="w-28 mx-auto text-center"></MapPinIcon>
                            </div>
                            <h2 className="text-2xl font-light">ABC Corporation Ltd. <br />
                                78, Bay View Tower, Level 12, <br />
                                Agrabad Commercial Area, Chittagong</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 lg:max-w-sm">
                            <div>
                                <Input {...register("name", { required: false })}
                                    label="Your Name" type="text" size="lg" placeholder="e.g. John Smith" />
                            </div>

                            <div>
                                <Input
                                    {...register("email", { required: "Email is required" })}
                                    label="Email" type="email" size="lg" placeholder="example@mail.com" />
                                <p className="text-red-500">{errors.email?.message}</p>
                            </div>

                            <div>
                                <Textarea
                                    {...register("message", { required: "Message can't be empty" })}
                                    label="Your Message"
                                    type="text"
                                    rows={6}
                                />
                                <p className="text-red-500">{errors.message?.message}</p>
                            </div>
                            <Button className="w-full" color="gray" type="submit">
                                Send message
                            </Button>
                        </form>
                    </div>
                </div>
            </ContainerX>
        </section>
    );
}

export default Contact;
