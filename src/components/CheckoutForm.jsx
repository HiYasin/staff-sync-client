

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from '@material-tailwind/react';
import useAxiosSecure from '../customHooks/useAxiosSecure';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
// import {CardElement, Elements, useElements, useStripe} from '../../src';


const CheckoutForm = ({ paymentInfo, refetch, handleOpen }) => {
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    useEffect(() => {
        getPaymentIntent();
    }, []);


    //console.log(paymentInfo);
    //console.log(clientSecret);


    // Fetch the client secret from the server
    const getPaymentIntent = async () => {
        try {
            const { data } = await axiosSecure.post('/payment-intent', paymentInfo);
            //console.log(data);
            setClientSecret(data.clientSecret);
        }
        catch (err) {
            console.log(err, err.data);
        }

    }

    //console.log(paymentInfo);
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            setProcessing(false);
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        //confirm payment
        const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: paymentInfo?.name,
                    email: paymentInfo?.email
                },
            },
        })
        //console.log(data);
        if (paymentIntent?.status === 'succeeded') {
            try {
                const today = new Date();
                const formattedDate = format(today, 'yyyy-MM-dd');
                const res = await axiosSecure.patch(`/payment/${paymentInfo._id}`,
                    { date: formattedDate, trxId: paymentIntent?.id }
                );
                if (res.data.modifiedCount > 0 && res.data.acknowledged) {
                    handleOpen();
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Payment confirmation successfully",
                    });
                    refetch();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Something went wrong!",
                    });
                }
            }
            catch (err) {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred!",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred!",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className='grid gap-2'>
            <div className='border border-blue-gray-200 p-3 rounded-md'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            <Button variant="gradient" disabled={!stripe || processing || !clientSecret} type="submit" className="min-w-[100px]">Confirm Payment</Button>
        </form>
    );
};

export default CheckoutForm;