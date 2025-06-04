import Link from 'next/link'
import React from 'react'
import Button from '../button/Button'
import { ServiceResponseItem } from '@/types/service-type'

export const TableServiceItem = (
    { service, idx, onDelete }: { service: ServiceResponseItem | null, idx: number, onDelete: () => void }
) => {
    return (
        <tr className='text-center border border-gold-500 w-full'>
            <td className='border-r-1 border-gold-500'>{idx}</td>
            <td className='border-r-1 border-gold-500'>{service?.name}</td>
            <td className='border-r-1 border-gold-500 p-1'>
                <div className='w-full line-clamp-5'>
                    {service?.description}
                </div>
            </td>
            <td className='border-r-1 border-gold-500'>{service?.price}</td>
            <td className='w-[10rem] border-r-1 border-gold-500'>{service?.estimation} jam</td>
            <td className='w-[10rem] p-2'>
                <div className='flex flex-col gap-y-1 px-3'>
                    <Link href={`/dashboard/service/${service?._id}`} className="w-full">
                        <Button className='p-1 rounded-md bg-blue-300 text-blue-500 hover:bg-blue-500 hover:text-blue-300 w-full cursor-pointer'>Ubah</Button></Link>
                    <Button className='w-full p-1 rounded-md bg-error-300 text-red-500 hover:bg-red-500 hover:text-red-300 cursor-pointer' onClick={onDelete}>Hapus</Button>
                </div>
            </td>
        </tr>
    )
}
