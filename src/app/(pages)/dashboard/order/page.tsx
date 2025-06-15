import { OrderContent } from '@/app/components/dashboard/order/OrderContent'
import React, { Suspense } from 'react'

const OrderPage = () => {
    return (
        <main className='w-full flex flex-col min-h-screen'>
            <Suspense fallback={<div>Loading...</div>}>
                <OrderContent />
            </Suspense>
        </main>
    )
}

export default OrderPage