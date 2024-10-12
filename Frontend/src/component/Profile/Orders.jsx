import React from 'react';
import OrderCard from './OrderCard';
// import { OrderCard } from '';

export const Orders = () => {
    const orders = [1, 1, 1, 1];

    return (
        <div className='flex items-center flex-col'>
            <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
            <div className='space-y-5 w-full lg:w-1/2'>
                {
                    orders.map((item, index) => (
                        <OrderCard key={index} /> 
                    ))
                }
            </div>
        </div>
    );
};
