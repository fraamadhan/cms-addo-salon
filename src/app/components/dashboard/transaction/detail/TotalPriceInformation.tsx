import { rupiahFormatter } from '@/lib/general'
import React from 'react'

export const TotalPriceInformation = (
    { subtotal, transactionFee, totalPrice, canceledItemsPrice }: { subtotal: number, transactionFee: number, totalPrice: number, canceledItemsPrice: number | undefined }
) => {
    return (
        <section className='w-full flex flex-col gap-4 items-start'>
            <div className='w-full flex items-center justify-between font-semibold'>
                <p className='leading-none'>Subtotal Harga Layanan</p>
                <p className='leading-none'>{rupiahFormatter(subtotal)}</p>
            </div>
            <div className='w-full flex items-center justify-between font-semibold'>
                <p className='leading-none'>{`Subtotal item yang dibatalkan`}</p>
                <p className='leading-none'>{`(-) ${rupiahFormatter(canceledItemsPrice ?? 0)}`}</p>
            </div>
            <div className='w-full flex items-center justify-between font-semibold'>
                <p className='leading-none'>Biaya Transaksi</p>
                <p className='leading-none'>{rupiahFormatter(transactionFee) ?? 0}</p>
            </div>
            <div className='w-full flex items-center justify-between text-xl font-bold'>
                <p className='leading-none'>Total Tagihan</p>
                <p className='leading-none'>{rupiahFormatter(totalPrice) ?? 0}</p>
            </div>
        </section>
    )
}
